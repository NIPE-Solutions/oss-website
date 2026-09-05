import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/projects/react-spring-bottom-sheet',
  '/projects/readonly-view',
  '/projects/flex-layout-codemod',
  '/projects/react-swipe-actions',
  '/impressum',
  '/privacy',
  '/contributing',
  '/security',
] as const

const projectAccentCases = [
  {
    route: '/projects/react-spring-bottom-sheet',
    entry: '.project-entry--bottom-sheet',
    visual: '.sheet-stage',
  },
  {
    route: '/projects/readonly-view',
    entry: '.project-entry--readonly-view',
    visual: '.view-model__source',
  },
  {
    route: '/projects/flex-layout-codemod',
    entry: '.project-entry--codemod',
    visual: '.migration-diff',
  },
  {
    route: '/projects/react-swipe-actions',
    entry: '.project-entry--swipe-actions',
    visual: '.swipe-row__content',
  },
] as const

for (const route of routes) {
  test(`has no serious or critical accessibility violations: ${route}`, async ({
    page,
  }) => {
    await page.goto(route)

    const results = await new AxeBuilder({ page }).analyze()
    const seriousViolations = results.violations.filter(({ impact }) =>
      ['serious', 'critical'].includes(impact ?? ''),
    )

    expect(seriousViolations).toEqual([])
  })
}

test.describe('narrow project code regions', () => {
  test.use({ viewport: { width: 375, height: 900 } })

  for (const route of routes.filter((path) => path.startsWith('/projects/'))) {
    test(`keeps scrollable code keyboard-focusable and axe-clean: ${route}`, async ({
      page,
    }) => {
      await page.goto(route)

      const scrollRegions = page.locator(
        '.code-example pre, .install-command pre',
      )
      await expect(scrollRegions).toHaveCount(2)

      for (let index = 0; index < 2; index += 1) {
        await expect(scrollRegions.nth(index)).toHaveAttribute('tabindex', '0')
        await scrollRegions.nth(index).focus()
        await expect(scrollRegions.nth(index)).toBeFocused()
      }

      const results = await new AxeBuilder({ page }).analyze()
      const seriousViolations = results.violations.filter(({ impact }) =>
        ['serious', 'critical'].includes(impact ?? ''),
      )

      expect(seriousViolations).toEqual([])
    })
  }
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`keeps text on NIPE red surfaces at 4.5:1 in ${colorScheme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/')

    const ratios = await page.evaluate(() => {
      function rgb(color: string) {
        const channels = color
          .match(/[\d.]+/g)
          ?.slice(0, 3)
          .map(Number)
        if (!channels || channels.length !== 3) {
          throw new Error(`Could not parse color: ${color}`)
        }
        return channels
      }

      function luminance(color: string) {
        const channels = rgb(color).map((channel) => {
          const value = channel / 255
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4
        })
        return (
          channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
        )
      }

      function contrast(foreground: string, background: string) {
        const lighter = Math.max(luminance(foreground), luminance(background))
        const darker = Math.min(luminance(foreground), luminance(background))
        return (lighter + 0.05) / (darker + 0.05)
      }

      const hubText = document.querySelector<SVGElement>(
        '.ecosystem-map__hub text',
      )!
      const hubSurface = document.querySelector<SVGElement>(
        '.ecosystem-map__hub rect',
      )!
      const selection = getComputedStyle(document.body, '::selection')

      return {
        ecosystemHub: contrast(
          getComputedStyle(hubText).fill,
          getComputedStyle(hubSurface).fill,
        ),
        selection: contrast(selection.color, selection.backgroundColor),
      }
    })

    expect(ratios.ecosystemHub).toBeGreaterThanOrEqual(4.5)
    expect(ratios.selection).toBeGreaterThanOrEqual(4.5)
  })

  for (const { route, entry, visual } of projectAccentCases) {
    test(`keeps project accents readable and visible in ${colorScheme} mode: ${route}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto(route)

      const source = page.getByRole('link', { name: 'Source for purpose' })
      await source.focus()

      const ratios = await page.evaluate(() => {
        function rgb(color: string) {
          const channels = color
            .match(/[\d.]+/g)
            ?.slice(0, 3)
            .map(Number)
          if (!channels || channels.length !== 3) {
            throw new Error(`Could not parse color: ${color}`)
          }
          return channels
        }

        function luminance(color: string) {
          const channels = rgb(color).map((channel) => {
            const value = channel / 255
            return value <= 0.04045
              ? value / 12.92
              : ((value + 0.055) / 1.055) ** 2.4
          })
          return (
            channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
          )
        }

        function contrast(foreground: string, background: string) {
          const lighter = Math.max(luminance(foreground), luminance(background))
          const darker = Math.min(luminance(foreground), luminance(background))
          return (lighter + 0.05) / (darker + 0.05)
        }

        const body = getComputedStyle(document.body)
        const sourceLink = getComputedStyle(document.activeElement!)
        const status = getComputedStyle(
          document.querySelector('.project-status')!,
        )
        return {
          sourceText: contrast(sourceLink.color, body.backgroundColor),
          statusText: contrast(status.color, body.backgroundColor),
          focusIndicator: contrast(
            sourceLink.outlineColor,
            body.backgroundColor,
          ),
        }
      })

      expect(ratios.sourceText).toBeGreaterThanOrEqual(4.5)
      expect(ratios.statusText).toBeGreaterThanOrEqual(4.5)
      expect(ratios.focusIndicator).toBeGreaterThanOrEqual(3)

      await page.goto('/')
      const visualBoundary = await page
        .locator(entry)
        .locator(visual)
        .evaluate((element) => {
          function rgb(color: string) {
            const channels = color
              .match(/[\d.]+/g)
              ?.slice(0, 3)
              .map(Number)
            if (!channels || channels.length !== 3) {
              throw new Error(`Could not parse color: ${color}`)
            }
            return channels
          }

          function luminance(color: string) {
            const channels = rgb(color).map((channel) => {
              const value = channel / 255
              return value <= 0.04045
                ? value / 12.92
                : ((value + 0.055) / 1.055) ** 2.4
            })
            return (
              channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
            )
          }

          const style = getComputedStyle(element)
          const lighter = Math.max(
            luminance(style.borderTopColor),
            luminance(style.backgroundColor),
          )
          const darker = Math.min(
            luminance(style.borderTopColor),
            luminance(style.backgroundColor),
          )
          return (lighter + 0.05) / (darker + 0.05)
        })

      expect(visualBoundary).toBeGreaterThanOrEqual(3)
    })
  }
}
