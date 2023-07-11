import fs from 'fs'
import { Box, Code, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import {
  BlogSectionPreview,
  ButtonLink,
  CompilerPlayground,
  ContributingCards,
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
  CONTRIBUTE_PATH,
  DOCS_URL,
  MAIN_CONTENT_ID,
  MAX_POSTS_TO_PREVIEW,
} from '@/constants'
import {
  fetchLatestVersion,
  fetchStargazersCount,
  getAllEvents,
  getPostsDataForRange,
} from '@/utils'
import type { BlogPostProps, EventPost } from '@/interfaces'

export const getStaticProps: GetStaticProps = async () => {
  // get list of all files from our posts directory
  const postFiles = fs.readdirSync(BLOG_POSTS_DIR)
  const sortedPostFiles = postFiles.sort().reverse()
  const previewBlogPosts = getPostsDataForRange(
    sortedPostFiles,
    { from: 0, to: MAX_POSTS_TO_PREVIEW },
    fs
  )
  const allEvents = getAllEvents(fs)
  const { versionNumber } = await fetchLatestVersion()
  const { stargazersCount } = await fetchStargazersCount()
  return {
    props: { previewBlogPosts, allEvents, versionNumber, stargazersCount },
  }
}

interface HomeProps {
  previewBlogPosts: BlogPostProps[]
  allEvents: EventPost[]
  versionNumber: string
  stargazersCount: number
}
export default function Home({
  previewBlogPosts,
  allEvents,
  versionNumber,
  stargazersCount,
}: HomeProps) {
  const futureEvents = allEvents.filter(
    ({ frontmatter: { endDate } }) => new Date(endDate) >= new Date()
  )
  const nextEvent = futureEvents.length ? futureEvents[0] : null
  const sectionPaddingY = useBreakpointValue({ base: 12, md: 24 })

  return (
    <>
      <PageMetadata
        title="Home"
        description="Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum."
      />
      <Box as="main" id={MAIN_CONTENT_ID}>
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
        <Section pt={16} pb={24} alignItems="center">
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
              <Text
                fontFamily="mono"
                color="primary"
                lineHeight="130%"
                fontSize="inherit"
              >
                Solidity {versionNumber}
              </Text>
            </Box>
            <Flex direction="column" justify="space-between" gap={6}>
              <Box>
                <Text lineHeight="180%" fontSize="md" mb={4}>
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
        <ShowcaseSection py={sectionPaddingY}>
          <ShowcaseContent
            title="Solidity is evolving rapidly"
            px={{ base: 4, md: 0 }}
          >
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
            <ButtonLink href={DOCS_URL} variant="solid" mt={8}>
              Get started
            </ButtonLink>
          </ShowcaseContent>
          <ShowcaseVisual>
            <Triangles variant="evolving" />
          </ShowcaseVisual>
        </ShowcaseSection>

        {/* Contribute to Solidity */}
        <Section py={sectionPaddingY} gap={12}>
          <ShowcaseSection startWithVisual px={0}>
            <ShowcaseContent title="Contribute to Solidity">
              <Text>
                Solidity continues to improve with help from a global community.
                Check out these ways to get involved and contribute to the
                Solidity project.
              </Text>
            </ShowcaseContent>
            <ShowcaseVisual>
              <Triangles variant="triforce" />
            </ShowcaseVisual>
          </ShowcaseSection>

          <ContributingCards />

          <Flex justify="center">
            <ButtonLink href={CONTRIBUTE_PATH} variant="solid">
              Start contributing
            </ButtonLink>
          </Flex>
        </Section>

        {/* Stay updated */}
        <Section py={sectionPaddingY} gap={12}>
          <ShowcaseSection px={0}>
            <ShowcaseContent title="Stay Updated">
              {/* TODO: Fix copy below; repeats from above */}
              <Text>
                As a relatively young language, Solidity is advancing at a rapid
                speed. We aim for a regular (non-breaking) release every month,
                with approximately one breaking release per year. You can follow
                the implementation status of new features in the Solidity Github
                project.
              </Text>
              <Text>
                You can see the upcoming changes for the next breaking release
                by switching from the default branch (<Code>develop</Code>) to
                the <Code>breaking branch</Code>. You can actively shape
                Solidity by providing your input and participating in the
                language design.
              </Text>
            </ShowcaseContent>
            <ShowcaseVisual>
              <Triangles variant="slash" />
            </ShowcaseVisual>
          </ShowcaseSection>

          {/* Latest from the blog */}
          <Section px={0}>
            <Text textStyle="h3" fontSize="xl">
              Latest from the blog
            </Text>
            <BlogSectionPreview postsData={previewBlogPosts} />
          </Section>

          <Flex justify="center">
            <ButtonLink href={BLOG_PATH} variant="solid">
              All blog updates
            </ButtonLink>
          </Flex>
        </Section>

        {/* Playground section */}
        <Section py={sectionPaddingY} gap={12}>
          <ShowcaseSection startWithVisual>
            <ShowcaseContent title="Playground">
              <Text>
                Try solidity yourself in this simple compiler. for a more fully
                featured browser based IDE, try using{' '}
                <Link href="https://remix.ethereum.org">Remix</Link>
              </Text>
            </ShowcaseContent>
            <ShowcaseVisual>
              <Triangles variant="double" />
            </ShowcaseVisual>
          </ShowcaseSection>

          {/* Interactive Solidity code editor and compiler */}
          <CompilerPlayground />
        </Section>

        {/* Upcoming solidity events */}
        <Section py={sectionPaddingY} gap={12}>
          <ShowcaseSection px={0} reverseMobile alignItems="start">
            <ShowcaseContent title="Solidity Events" flex={4}>
              <Text>
                The Solidity Summit is a free interactive forum for people
                involved and interested in the Solidity language and the
                ecosystem around it.
              </Text>
              <Text>
                Enable useful (language-design related) discussions which result
                in improvement proposals and actual implementations, foster
                communication between teams working on similar topics and
                Identify needs for the smart contract ecosystem for Ethereum.
              </Text>
            </ShowcaseContent>
            <ShowcaseVisual direction="column" flex={5} w="full">
              {nextEvent ? (
                <EventCard frontmatter={nextEvent.frontmatter} />
              ) : (
                <Text>No upcoming events</Text>
              )}
            </ShowcaseVisual>
          </ShowcaseSection>

          {/* Past events */}
          <Section gap={6} px={0}>
            <Text as="h3" fontSize="xl" color="primary" fontWeight="bold">
              Past events
            </Text>
            <EventPreview events={allEvents} />
          </Section>
        </Section>
      </Box>
    </>
  )
}
