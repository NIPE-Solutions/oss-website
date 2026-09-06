import type { OpenSourceProject } from '@/content/project-types'

// Each drawing describes the package's operation, in the same coordinate system.
const geometry: Record<OpenSourceProject['visual'], readonly string[]> = {
  technical: ['M30 30H150V90H30Z M60 60H120'],
  'bottom-sheet': [
    'M24 18H154V102H24Z',
    'M14 46H164 M14 78H164',
    'M36 58H142V102H36Z M76 66H104',
  ],
  'swipe-actions': [
    'M18 34H162V86H18Z M44 34V86 M138 34V86',
    'M44 28H138V80H44Z M56 46H122 M56 58H108',
    'M24 58H36 M30 52V64 M146 58H156',
  ],
  'anchored-layer': [
    'M26 20H78V38H26Z',
    'M26 38V88 M78 38V88 M16 48H158',
    'M38 54H156V100H38Z M48 68H126 M48 80H102',
  ],
  'pull-to-refresh': [
    'M26 18H154 M26 102H154 M26 70H154',
    'M90 18V54 M82 46L90 54L98 46',
    'M78 84C78 68 102 68 102 84C102 94 92 98 84 92',
  ],
  'drag-dismiss': [
    'M20 40H78V94H20Z',
    'M48 64L146 34 M134 30L146 34L140 46',
    'M106 22L158 10L170 62L118 74Z',
  ],
  'caret-geometry': [
    'M16 44H70 M82 44H162 M16 74H162 M16 96H110',
    'M76 28V74 M70 28H82 M70 74H82',
    'M76 18H142V74 M142 12V24 M136 18H148',
  ],
  viewport: [
    'M24 14H156V106H24Z',
    'M40 30H136V84H40Z M40 84H136V98H40Z',
    'M14 14V30 M10 14H18 M10 30H18 M24 6H40 M24 2V10 M40 2V10',
  ],
  'readonly-view': [
    'M12 30H66V90H12Z M118 30H172V90H118Z',
    'M84 16V104 M96 16V104 M66 60H118',
    'M24 46H52 M24 60H44 M24 74H52 M130 46H158 M130 60H150 M130 74H158',
  ],
  codemod: [
    'M14 22H64V96H14Z M116 22H166V96H116Z',
    'M64 58H116 M106 50L116 58L106 66 M80 38L90 28L100 38',
    'M24 42H52 M24 56H46 M24 70H52 M126 42H154 M126 56H150 M126 70H154',
  ],
}
export function ProjectMotif({
  visual,
  decorative = false,
  color = 'currentColor',
}: {
  readonly visual: OpenSourceProject['visual']
  readonly decorative?: boolean
  readonly color?: string
}) {
  return (
    <svg
      className={`project-motif project-motif--${visual}`}
      data-testid={`project-motif-${visual}`}
      aria-hidden={decorative || undefined}
      viewBox="0 0 180 120"
      width="180"
      height="120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {(geometry[visual] ?? ['M30 30H150V90H30Z M60 60H120']).map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={i === 2 ? 2 : 1}
          strokeDasharray={i === 1 ? '3 4' : undefined}
        />
      ))}
    </svg>
  )
}
