import fs from 'fs'
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
import {
  BLOG_PATH,
  BLOG_POSTS_DIR,
  DOCS_URL,
  MAX_POSTS_TO_PREVIEW,
} from '@/constants'
import {
  fetchLatestVersion,
  fetchStargazersCount,
  getPostsDataForRange,
} from '@/utils'
import type { BlogPostProps } from '@/interfaces'
import { events } from '@/data' // TODO: Pull from MD pages

export const getStaticProps: GetStaticProps = async () => {
  // get list of all files from our posts directory
  const files = fs.readdirSync(BLOG_POSTS_DIR)
  const sortedFiles = files.sort().reverse()
  const previewBlogPosts = getPostsDataForRange(
    sortedFiles,
    { from: 0, to: MAX_POSTS_TO_PREVIEW },
    fs
  )

  const { versionNumber } = await fetchLatestVersion()
  const { stargazersCount } = await fetchStargazersCount()
  return { props: { previewBlogPosts, versionNumber, stargazersCount } }
}

interface HomeProps {
  previewBlogPosts: BlogPostProps[]
  versionNumber: string
  stargazersCount: number
}
export default function Home({
  previewBlogPosts,
  versionNumber,
  stargazersCount,
}: HomeProps) {
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
        {/* HERO */}
        <Hero
          header="Solidity"
          cta={[{ name: 'Get into the docs', href: DOCS_URL }]}
          stargazersCount={stargazersCount}
        >
          A statically-typed curly-braces programming language designed for
          developing smart contracts that run on{' '}
          <Link href="https://ethereum.org">Ethereum</Link>.
          <PragmaWatermark />
        </Hero>

        {/* SOLIDITY VERSION */}
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
            <Box fontSize="2xl" maxW="8ch">
              <Text fontFamily="mono" color="b" lineHeight="130%">
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

        {/* Solidity is evolving rapidly > Get started */}
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

        {/* Contribute to Solidity */}
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

        {/* Cards: Ways to contribute */}
        {/* TODO: Add "contributing cards" with "Start contributing" CTA button */}

        {/* Stay updated */}
        {/* TODO: Update copy */}
        <ShowcaseSection>
          <ShowcaseContent title="Stay Updated">
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              commodi dicta debitis eligendi quo exercitationem. Repellendus
              repellat itaque sapiente quibusdam? Iste illum nihil, possimus
              accusamus ea voluptatum nisi illo eligendi.
            </Text>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variantIndex={2} />
          </ShowcaseVisual>
        </ShowcaseSection>

        {/* Latest from the blog */}
        <Section py={16} gap={6}>
          <Text textStyle="h3">Latest from the blog</Text>
          <BlogSectionPreview postsData={previewBlogPosts} />
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

        {/* <Section py={8}>
          <CompilerPlayground />
        </Section> */}

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
            <Text color="primary" fontSize="xl">
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
          <Text fontSize="xl" color="primary">
            Past events
          </Text>
          <EventPreview />
        </Section>
      </main>
    </>
  )
}
