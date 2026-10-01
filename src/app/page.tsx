import { Hero } from '@/components/hero'
import { Principles } from '@/components/principles'
import { ProjectDirectory } from '@/components/project-directory'
import { SupportRouting } from '@/components/support-routing'
import { CommunitySupport } from '@/components/community-support'
import { CustomWork } from '@/components/custom-work'

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectDirectory />
      <CommunitySupport />
      <CustomWork />
      <Principles />
      <SupportRouting />
    </>
  )
}
