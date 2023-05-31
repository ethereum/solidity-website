import { Flex, Text } from '@chakra-ui/react'
import { Hero, PageMetadata, Section } from '@/components'
import { CONTRIBUTE_PATH, DOCS_URL } from '../../constants'

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
          description="The Solidity language evolved rapidly, we’re still out here, still learning, still trying to push Solidity to the next, better stages."
          cta={[
            { name: 'Get started', href: DOCS_URL },
            { name: 'Contribute', href: CONTRIBUTE_PATH },
          ]}
        />
        <Section>
          <Flex
            as="article"
            direction="column"
            gap={4}
            maxW="container.md"
            pt={28}
            pb={64}
            px={20}
            fontSize="md"
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
              Solidity offers a range of features and functionalities tailored
              for blockchain development. Its static typing ensures code
              integrity and reduces common errors by enforcing explicit variable
              type declarations. The language also supports contract modularity
              and inheritance, enabling code reuse and composability.
            </Text>
            <Text>
              Security is a paramount concern in blockchain development, and
              Solidity addresses this by incorporating features to enhance
              contract safety. Visibility modifiers, input validation
              mechanisms, and best practices help mitigate vulnerabilities and
              strengthen the security of smart contracts.
            </Text>
            <Text>
              With Solidity, developers gain access to a thriving ecosystem
              supported by a passionate community. They can leverage extensive
              documentation, tutorials, and examples to learn the language and
              harness its capabilities. Additionally, a wide range of
              development tools and frameworks, such as Remix IDE and Truffle
              Suite, make it easier to build, test, and deploy Solidity smart
              contracts.
            </Text>
            <Text>
              Solidity has played a pivotal role in the growth of Ethereum and
              the blockchain ecosystem. It has been instrumental in enabling
              decentralized finance (DeFi) applications, non-fungible tokens
              (NFTs), decentralized exchanges, and various other
              blockchain-based solutions.
            </Text>
            <Text>
              Solidity was publicly previewed for the first time in November
              2014 at Devcon0. Solidity v0.1.0 turned 5 years old on July 8th
              2020. You can read more about Solidity's history here.
            </Text>
            <Text>
              The Solidity programming language is an open-source, community
              project governed by a core team. The core team is sponsored by the
              Ethereum Foundation.
            </Text>
          </Flex>
        </Section>
      </main>
    </>
  )
}
