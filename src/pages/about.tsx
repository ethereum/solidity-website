import { Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import { Hero, Link, PageMetadata, Section } from '@/components'
import {
  CONTRIBUTE_PATH,
  DOCS_URL,
  FORUM_URL,
  MAIN_CONTENT_ID,
} from '@/constants'

interface FaqItemProps extends FlexProps {
  question: string
}
const FaqItem: React.FC<FaqItemProps> = ({
  question,
  children,
  ...flexProps
}) => (
  <Flex direction={{ base: 'column', md: 'row' }} py={6} gap={6} {...flexProps}>
    <Text flex={1} textStyle="h6-mono" color="text">
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
      <Box as="main" id={MAIN_CONTENT_ID}>
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
          bgImg="url(/assets/about-bg.svg)"
          bgRepeat="no-repeat"
          bgPosition="top center"
        >
          <Text>
            <b>Solidity</b> is a powerful programming language designed
            specifically for writing smart contracts on the Ethereum blockchain.
            With Solidity, developers can define the rules and behavior of{' '}
            <b>decentralized applications (DApps)</b>, enabling the creation of
            innovative and secure blockchain-based solutions.
          </Text>
          <Text>
            At its core, Solidity provides a contract-oriented approach,
            allowing developers to encapsulate logic, data, and interactions
            into self-executing smart contracts. These contracts guarantee the
            execution of agreements and transactions,{' '}
            <b>removing the need for intermediaries</b> and enabling
            decentralized, trustless interactions.
          </Text>
          <Text>
            Solidity offers a range of features and functionalities tailored for
            blockchain development. Its static typing ensures code integrity and
            reduces common errors by enforcing explicit variable type
            declarations. The language also supports contract modularity and
            inheritance, enabling code <b>reuse and composability</b>.
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
            supported by a passionate community. They can leverage extensive{' '}
            <b>documentation</b>, <b>tutorials</b>, and <b>examples</b> to learn
            the language and harness its capabilities. Additionally, a wide
            range of development tools and frameworks, such as{' '}
            <Link href="https://remix.ethereum.org">Remix IDE</Link> and{' '}
            <Link href="https://trufflesuite.com/">Truffle Suite</Link>, make it
            easier to build, test, and deploy Solidity smart contracts.
          </Text>
          <Text>
            Solidity has played a pivotal role in the growth of Ethereum and the
            blockchain ecosystem. It has been instrumental in enabling{' '}
            <b>decentralized finance (DeFi)</b> applications,{' '}
            <b>non-fungible tokens (NFTs)</b>, <b>decentralized exchanges</b>,
            and various other blockchain-based solutions.
          </Text>
          <Text>
            Solidity was publicly previewed for the first time in November 2014
            at Devcon0. Solidity v0.1.0 turned 5 years old on July 8th 2020. You
            can read more about Solidity&apos;s history here.
          </Text>
          <Text>
            The Solidity programming language is an <b>open-source</b>,
            community project governed by a core team. The core team is
            sponsored by the Ethereum Foundation.
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
          <FaqItem question="Can Solidity be used for platforms other than Ethereum?">
            Solidity is primarily designed for Ethereum, but it has been adopted
            by other blockchain platforms that are Ethereum Virtual Machine
            (EVM) compatible. These platforms include Ethereum Classic, Binance
            Smart Chain, and others.
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
          <FaqItem question="Is Solidity a secure language?">
            While Solidity provides features to enhance contract security,
            writing secure smart contracts requires careful attention and
            adherence to best practices. Solidity has evolved over time to
            address vulnerabilities, but developers should stay updated with the
            latest security considerations and conduct thorough code audits.
          </FaqItem>
          <FaqItem question="Can Solidity be used for off-chain computations?">
            Solidity is primarily focused on on-chain computations within smart
            contracts. However, it can interact with off-chain systems and
            oracles to access external data and trigger actions based on that
            data.
          </FaqItem>
          <FaqItem question="Is Solidity backward-compatible?">
            Solidity strives to maintain backward compatibility, but breaking
            changes may occur in major language versions. It&apos;s important to
            consider the compiler version and be aware of any deprecated or
            changed features when working with different Solidity versions.
          </FaqItem>
          <FaqItem question="Can I use Solidity for private or permissioned blockchains?">
            Solidity is primarily designed for public blockchains like Ethereum,
            but it can also be used for private or permissioned blockchains with
            Ethereum-like functionality, such as Quorum or Hyperledger Besu.
          </FaqItem>
          <FaqItem question="Can Solidity handle financial calculations and complex arithmetic?">
            Solidity provides built-in support for arithmetic operations,
            including integers and fixed-point decimals. It can handle financial
            calculations, but developers should be aware of potential precision
            and rounding issues when dealing with complex arithmetic.
          </FaqItem>
          <FaqItem question="Are there any limitations or challenges in using Solidity?">
            Solidity, like any programming language, has its limitations and
            challenges. Some common considerations include gas optimization to
            reduce transaction costs, avoiding security vulnerabilities, and
            ensuring proper contract upgradeability and maintenance.
          </FaqItem>
          <FaqItem question="Can I write tests for Solidity contracts?">
            Yes, Solidity contracts can be tested using various testing
            frameworks like Truffle, Hardhat, and Remix. These frameworks
            provide tools for writing unit tests, integration tests, and
            simulation tests to ensure the correctness and functionality of your
            contracts.
          </FaqItem>
          <FaqItem question="Is it possible to debug Solidity contracts?">
            Solidity contracts can be debugged using specialized tools like
            Remix IDE, Truffle Debugger, or Hardhat Debugger. These tools allow
            you to step through your contract code, inspect variables, and
            identify issues during development and testing.
          </FaqItem>
          <FaqItem question="Can Solidity contracts interact with other contracts?">
            Yes, Solidity contracts can interact with other contracts through
            function calls and message passing. Contract interactions enable the
            composition of complex decentralized systems by leveraging the
            functionalities of multiple contracts.
          </FaqItem>
          <FaqItem question="Can Solidity contracts be upgraded or modified after deployment?">
            It is possible to design contracts for upgradability, but it
            requires careful consideration of contract architecture and storage
            layout. Upgrading contracts can be complex and has potential
            security implications, so it should be approached with caution.
          </FaqItem>
        </Section>
      </Box>
    </>
  )
}
