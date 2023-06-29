import { Hero, Link, PageMetadata, Section } from '@/components'

export default function Page404() {
  return (
    <>
      <PageMetadata title="404" description="Page not found" />
      <main>
        <Hero header="404">Page not found</Hero>
      </main>
      <Section>
        <Link
          href="/"
          textDecoration="none"
          _hover={{ textDecoration: 'underline' }}
          textAlign="center"
          w="100%"
        >
          [Return home]
        </Link>
      </Section>
    </>
  )
}
