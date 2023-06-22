import { Box, Flex, Text } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import {
  BlogSectionPreview,
  ButtonLink,
  CompilerPlayground,
  EventCard,
  EventPreview,
  Hero,
  Link,
  PageMetadata,
  PragmaWatermark,
  Section,
  ShowcaseContent,
  ShowcaseSection,
  ShowcaseVisual,
  Triangles,
} from '@/components'
import { BLOG_PATH, DOCS_URL } from '@/constants'
import { fetchLatestVersion, fetchStargazersCount } from '@/utils'
import { events } from '@/data'

export const getStaticProps: GetStaticProps = async () => {
  const { versionNumber } = await fetchLatestVersion()
  const { stargazersCount } = await fetchStargazersCount()
  return { props: { versionNumber, stargazersCount } }
}

interface HomeProps {
  versionNumber: string
  stargazersCount: number
}
export default function Home({ versionNumber, stargazersCount }: HomeProps) {
  const futureEvents = events.filter(
    (event) => new Date(event.endDate) >= new Date()
  )
  const nextEvent = futureEvents.length ? futureEvents[0] : null
  return (
    <>
      <PageMetadata
        title="Home"
        description="Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum."
      />
      <main>
        <Hero
          header="Solidity"
          cta={[{ name: 'Get into the docs', href: DOCS_URL }]}
          stargazerCount={stargazersCount}
        >
          A statically-typed curly-braces programming language designed for
          developing smart contracts that run on{' '}
          <Link href="https://ethereum.org">Ethereum</Link>.
          <PragmaWatermark />
        </Hero>

        <Section py={8} alignItems="center">
          <Flex
            as="aside"
            direction={['column', null, 'row']}
            gap={8}
            p={8}
            border="1px"
            borderColor="border"
            alignItems="start"
            maxW="container.lg"
          >
            <Box fontSize="xl" maxW="8ch">
              <Text fontFamily="mono" color="header" lineHeight="130%">
                Solidity {versionNumber}
              </Text>
            </Box>
            <Flex direction="column" justify="space-between" gap={6}>
              <Box>
                <Text lineHeight="180%" fontSize="md">
                  <Link
                    href="https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/"
                    fontWeight="bold"
                  >
                    Solidity 0.8.20
                  </Link>{' '}
                  includes a range of improvements in the via-IR pipeline and
                  improves the list of events exposed in the contract ABI, and,
                  most importantly, introduces support for the Shanghai hard
                  fork!
                </Text>
                <Text>We have also included 3 bugfixes in this release!</Text>
              </Box>
            </Flex>
          </Flex>
        </Section>

        <ShowcaseSection>
          <ShowcaseContent title="Solidity is evolving rapidly" gap={8}>
            <Text>
              We aim for a regular (non-breaking) release every month, with
              approximately one breaking release per year. You can follow the
              implementation status of new features in the{' '}
              <Link
                href="https://github.com/ethereum/solidity/projects/43"
                fontWeight="bold"
              >
                Solidity Github project
              </Link>
              .
            </Text>
            <ButtonLink href={DOCS_URL} variant="outline">
              Get started
            </ButtonLink>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variantIndex={0} />
          </ShowcaseVisual>
        </ShowcaseSection>

        <ShowcaseSection startWithVisual>
          <ShowcaseContent title="Contribute to Solidity">
            <Text>
              You can see the upcoming changes for the next breaking release by
              switching from the default branch (`develop`) to the `breaking
              branch`. Shape Solidity by providing your input and participating
              in the language design.
            </Text>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variantIndex={1} />
          </ShowcaseVisual>
        </ShowcaseSection>

        {/* TODO: Start contributing cards with "Start contributing" CTA button */}

        <ShowcaseSection>
          <ShowcaseContent title="Stay Updated">
            <Text>
              We aim for a regular (non-breaking) release every month, with
              approximately one breaking release per year. You can follow the
              implementation status of new features in the{' '}
              <Link
                href="https://github.com/ethereum/solidity/projects/43"
                fontWeight="bold"
              >
                Solidity Github project
              </Link>
              .
            </Text>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variantIndex={2} />
          </ShowcaseVisual>
        </ShowcaseSection>

        <Section py={16} gap={6}>
          <Text textStyle="h3">Latest from the blog</Text>
          <BlogSectionPreview />
          <Flex justify="center">
            <ButtonLink href={BLOG_PATH} variant="outline">
              All blog updates
            </ButtonLink>
          </Flex>
        </Section>

        <ShowcaseSection startWithVisual>
          <ShowcaseContent title="Playground">
            <Text>
              Try solidity yourself in this simple compiler. for a more fully
              featured browser based IDE, try using{' '}
              <Link href="https://remix.ethereum.org">Remix</Link>
            </Text>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variantIndex={3} />
          </ShowcaseVisual>
        </ShowcaseSection>

        <Section py={8}>
          <CompilerPlayground />
        </Section>

        <ShowcaseSection>
          <ShowcaseContent title="Solidity Events">
            <Text>
              The Solidity Summit is a free interactive forum for people
              involved and interested in the Solidity language and the ecosystem
              around it.
            </Text>
            <Text>
              Enable useful (language-design related) discussions which result
              in improvement proposals and actual implementations, foster
              communication between teams working on similar topics and Identify
              needs for the smart contract ecosystem for Ethereum.
            </Text>
          </ShowcaseContent>
          <ShowcaseVisual direction="column">
            <Text color="primary" fontSize="lg">
              Upcoming event
            </Text>
            {nextEvent ? (
              <EventCard event={nextEvent} />
            ) : (
              <Text>No upcoming events</Text>
            )}
          </ShowcaseVisual>
        </ShowcaseSection>

        <Section gap={6}>
          <Text fontSize="lg" color="primary">
            Past events
          </Text>
          <EventPreview />
        </Section>
      </main>
    </>
  )
}
