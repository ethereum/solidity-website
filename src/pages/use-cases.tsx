import { Grid } from '@chakra-ui/react'
import { Hero, UseCaseCard, PageMetadata, Section } from '@/components'
import { DOCS_URL, USE_CASES } from '@/constants'

export default function UseCases() {
  return (
    <>
      <PageMetadata
        title="Use cases"
        description="Learn how Solidity can be used to solve real world problems."
      />
      <main>
        <Hero
          header="Use cases"
          cta={[{ name: 'Get to the docs', href: DOCS_URL }]}
        >
          The flexibility, security features, and integration with the Ethereum
          blockchain make it a powerful tool for developing decentralized
          applications across various industries.
        </Hero>
        <Section>
          <Grid
            // templateColumns={['1fr', null, 'repeat(2, 1fr)']}
            templateColumns="1fr"
            maxW="container.md"
            mx="auto"
            gap={24}
            py={20}
          >
            {USE_CASES.map((useCase) => (
              <UseCaseCard useCase={useCase} key={useCase.title} />
            ))}
          </Grid>
        </Section>
      </main>
    </>
  )
}
