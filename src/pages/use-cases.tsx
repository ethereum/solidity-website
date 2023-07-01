import { Text } from '@chakra-ui/react'
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
          cta={[{ name: 'Get started', href: DOCS_URL }]}
        >
          The flexibility, security features, and integration with the Ethereum
          blockchain make it a powerful tool for developing decentralized
          applications across various industries.
        </Hero>
        <Section
          direction="column"
          maxW="container.md"
          mx="auto"
          gap={24}
          py={20}
        >
          {USE_CASES.map((useCase, index) => (
            <UseCaseCard useCase={useCase} key={useCase.title} index={index} />
          ))}
        </Section>
        <Section gap={4}>
          <Text textStyle="h3" color="text">
            ... and much more
          </Text>
          <Text>
            Solidity 0.8.20 includes a range of improvements in the via-IR
            pipeline and improves the list of events exposed in the contract
            ABI, and, most importantly, introduces support for the Shanghai hard
            fork!
          </Text>
          <Text>We have also included 3 bug fixes in this release!</Text>
        </Section>
      </main>
    </>
  )
}
