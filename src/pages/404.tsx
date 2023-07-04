import { Hero, Link, PageMetadata, Section } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'
import { Box } from '@chakra-ui/react'

export default function Page404() {
  return (
    <>
      <PageMetadata title="404" description="Page not found" />
      <Box as="main" id={MAIN_CONTENT_ID}>
        <Hero header="404">Page not found</Hero>
      </Box>
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
