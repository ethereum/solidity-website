import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import {
  BlogPreview,
  ButtonLink,
  Hero,
  Link,
  PageMetadata,
  Section,
} from '@/components'
import { DOCS_URL } from '../../constants'

const VERSION = 'v0.8.20'

export default function Home() {
  return (
    <>
      <PageMetadata
        title="Home"
        description="Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum."
      />
      <main>
        <Hero
          header="Solidity"
          description={
            <Text>
              A statically-typed curly-braces programming language designed for
              developing smart contracts that run on{' '}
              <Link href="https://ethereum.org">Ethereum</Link>.
            </Text>
          }
          cta={[{ name: 'Get to the docs', href: DOCS_URL }]}
        />
        <Section py={8}>
          <Flex as="aside" gap={16}>
            <Box fontSize="3xl" maxW="8ch">
              <Text fontWeight="bold" fontSize="md" fontFamily="body">
                latest version
              </Text>
              <Text fontFamily="mono">Solidity {VERSION}</Text>
            </Box>
            <Flex direction="column" justify="space-between">
              <Box>
                <Text maxW="container.sm">
                  Solidity 0.8.20 includes a range of improvements in the via-IR
                  pipeline and improves the list of events exposed in the
                  contract ABI, and, most importantly, introduces support for
                  the Shanghai hard fork!
                </Text>
                <Text>We have also included 3 bugfixes in this release!</Text>
              </Box>
              <ButtonLink href="#">Release announcement</ButtonLink>
            </Flex>
          </Flex>
        </Section>
        <Section bg="gray.100" py={16}>
          <Flex direction={['column', null, null, 'row']} gap={12}>
            <Flex direction="column" gap={8} maxW="container.xs">
              <Text as="h2" textStyle="h2">
                New to Solidity
              </Text>
              <Text>
                As a beginner, you find great tutorials, resources and tools
                that help you get started building with Solidity on the{' '}
                <Link href="https://ethereum.org/developers/">
                  ethereum.org developer portal
                </Link>
                .
              </Text>
              <Text>
                Alternatively, you can start by learning the basics about
                blockchain, smart contracts and the Ethereum Virtual Machine
                (EVM) in the Solidity docs.
              </Text>
            </Flex>
            <Grid
              flex={1}
              placeItems="center"
              borderRadius="base"
              bg="bg"
              color="fg"
            >
              [Interactive compiler]
            </Grid>
          </Flex>
        </Section>
        <Section py={16} gap={6}>
          <Text as="h2" textStyle="h2">
            Stay Updated
          </Text>
          <Text maxW="container.sm">
            As a relatively young language, Solidity is advancing at a rapid
            speed. We aim for a regular (non-breaking) release every month, with
            approximately one breaking release per year. You can follow the
            implementation status of new features in the{' '}
            <Link href="https://github.com/ethereum/solidity/projects/43">
              Solidity Github project
            </Link>
            .
          </Text>
          <Text maxW="container.sm">
            You can see the upcoming changes for the next breaking release by
            switching from the default branch (`develop`) to the `breaking
            branch`. You can actively shape Solidity by providing your input and
            participating in the language design.
          </Text>
          <Text />
          <BlogPreview />
        </Section>
      </main>
    </>
  )
}
