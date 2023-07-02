import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { Hero, Link, PageMetadata, Section } from '@/components'
import { CONTRIBUTE_PATH, DOCS_URL, FORUM_URL } from '@/constants'

interface FaqItemProps extends FlexProps {
  question: string
}
const FaqItem: React.FC<FaqItemProps> = ({
  question,
  children,
  ...flexProps
}) => (
  <Flex direction={{ base: 'column', md: 'row' }} py={6} gap={6} {...flexProps}>
    <Text
      flex={1}
      textStyle="h6-mono"
      color="text"
      textAlign={{ base: 'start', md: 'end' }}
    >
      {question}
    </Text>
    <Text flex={2}>{children}</Text>
  </Flex>
)
export default function About() {
  return (
    <>
      <PageMetadata
        title="About"
        description="Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum."
      />
      <main>
        <Hero
          header="About"
          cta={[
            { name: 'Get started', href: DOCS_URL },
            { name: 'Contribute', href: CONTRIBUTE_PATH },
          ]}
        >
          The Solidity language evolved rapidly, we&apos;re still out here,
          still learning, still trying to push Solidity to the next, better
          stages.
        </Hero>
        <Section
          as="article"
          direction="column"
          gap={4}
          maxW="container.md"
          py={24}
          mx="auto"
          fontSize="md"
          bgImg="url(/assets/about-bg.svg)"
          bgRepeat="no-repeat"
          bgPosition="top center"
        >
          <Text>
            Solidity is a powerful programming language designed specifically
            for writing smart contracts on the Ethereum blockchain. With
            Solidity, developers can define the rules and behavior of
            decentralized applications (DApps), enabling the creation of
            innovative and secure blockchain-based solutions.
          </Text>
          <Text>
            At its core, Solidity provides a contract-oriented approach,
            allowing developers to encapsulate logic, data, and interactions
            into self-executing smart contracts. These contracts automate the
            execution of agreements and transactions, removing the need for
            intermediaries and enabling decentralized, trustless interactions.
          </Text>
          <Text>
            Solidity offers a range of features and functionalities tailored for
            blockchain development. Its static typing ensures code integrity and
            reduces common errors by enforcing explicit variable type
            declarations. The language also supports contract modularity and
            inheritance, enabling code reuse and composability.
          </Text>
          <Text>
            Security is a paramount concern in blockchain development, and
            Solidity addresses this by incorporating features to enhance
            contract safety. Visibility modifiers, input validation mechanisms,
            and best practices help mitigate vulnerabilities and strengthen the
            security of smart contracts.
          </Text>
          <Text>
            With Solidity, developers gain access to a thriving ecosystem
            supported by a passionate community. They can leverage extensive
            documentation, tutorials, and examples to learn the language and
            harness its capabilities. Additionally, a wide range of development
            tools and frameworks, such as Remix IDE and Truffle Suite, make it
            easier to build, test, and deploy Solidity smart contracts.
          </Text>
          <Text>
            Solidity has played a pivotal role in the growth of Ethereum and the
            blockchain ecosystem. It has been instrumental in enabling
            decentralized finance (DeFi) applications, non-fungible tokens
            (NFTs), decentralized exchanges, and various other blockchain-based
            solutions.
          </Text>
          <Text>
            Solidity was publicly previewed for the first time in November 2014
            at Devcon0. Solidity v0.1.0 turned 5 years old on July 8th 2020. You
            can read more about Solidity&apos;s history here.
          </Text>
          <Text>
            The Solidity programming language is an open-source, community
            project governed by a core team. The core team is sponsored by the
            Ethereum Foundation.
          </Text>
        </Section>

        <Section maxW="container.lg" py={16} mx="auto">
          <Text as="h2" textStyle="h3" mb={16}>
            Frequently asked questions about Solidity
          </Text>
          <FaqItem question="What is Solidity?">
            Solidity is a programming language specifically designed for writing
            smart contracts on the Ethereum blockchain. It enables developers to
            define the behavior and rules of decentralized applications (DApps)
            and facilitates secure and reliable execution of these contracts
          </FaqItem>
          <FaqItem question="What is the purpose of Solidity?">
            Solidity aims to provide a language for creating self-executing
            smart contracts that automate transactions and agreements on the
            Ethereum blockchain. It allows developers to write code that defines
            the logic and interactions within decentralized applications.
          </FaqItem>
          <FaqItem question="What are the key features of Solidity?">
            Solidity offers features such as contract-oriented programming,
            static typing, inheritance, events, modifiers, and a comprehensive
            standard library. It supports the creation of complex smart
            contracts with custom data structures, mappings, and enums.
          </FaqItem>
          <FaqItem question="How can I learn Solidity?">
            Learning Solidity can be achieved through various online resources,{' '}
            <Link href="https://www.w3schools.io/blockchain/solidity-tutorials/">
              tutorials
            </Link>
            , <Link href={DOCS_URL}>documentation</Link>, and{' '}
            <Link href={FORUM_URL}>community forums</Link>. You can engage with
            other developers and learn from their experiences.
          </FaqItem>
        </Section>
      </main>
    </>
  )
}
