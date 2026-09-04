import { Hero } from '@/components/hero'
import { Principles } from '@/components/principles'
import { ProjectDirectory } from '@/components/project-directory'
import { SupportRouting } from '@/components/support-routing'

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectDirectory />
      <Principles />
      <SupportRouting />
    </>
  )
}
