import { Grid } from '@chakra-ui/react'
import { Hero, UseCaseCard, PageMetadata, Section } from '@/components'
import { DOCS_URL } from '@/constants'
import type { UseCase } from '@/interfaces'

const useCases: UseCase[] = [
  {
    title: 'Decentralized Finance (DeFi)',
    description:
      'Solidity has played a pivotal role in the rise of DeFi applications built on the Ethereum blockchain. Projects such as Uniswap (decentralized exchange protocol), Aave (decentralized lending platform), and Compound (algorithmic money markets) have extensively used Solidity to create smart contracts that enable various financial services and functionalities.',
    imageSrc: '/assets/use-case-glyph-1.svg',
  },
  {
    title: 'Non-Fungible Tokens (NFTs)',
    description:
      'Solidity has been instrumental in the development of NFTs, which have gained significant popularity for digital collectibles, artwork, and unique virtual assets. Projects like CryptoKitties, CryptoPunks, and Rarible have used Solidity to create the smart contracts that power the creation, ownership, and transfer of these one-of-a-kind digital assets.',
    imageSrc: '/assets/use-case-glyph-2.svg',
  },
  {
    title: 'Decentralized Autonomous Organizations (DAOs)',
    description:
      'Solidity has enabled the creation of DAOs, which are self-governing organizations that operate on smart contracts. Projects like Aragon and DAOstack have utilized Solidity to build frameworks and tools for creating and managing decentralized organizations, allowing for transparent decision-making and governance.',
    imageSrc: '/assets/use-case-glyph-3.svg',
  },
  {
    title: 'Gaming and Virtual Worlds',
    description:
      'Solidity has been employed to develop blockchain-based games and virtual worlds with features like asset ownership, in-game economies, and provable scarcity. Projects like Axie Infinity, Decentraland, and Gods Unchained have leveraged Solidity to create immersive gaming experiences with unique digital assets and player interactions.',
    imageSrc: '/assets/use-case-glyph-4.svg',
  },
  {
    title: 'Supply Chain and Traceability',
    description:
      'Solidity can be used to create smart contracts that enhance transparency and traceability in supply chain management. By recording transactions and verifying the authenticity of products, Solidity-powered smart contracts can help prevent counterfeiting and improve trust in supply chain processes.',
    imageSrc: '/assets/use-case-glyph-5.svg',
  },
]
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
            templateColumns={['1fr', null, 'repeat(2, 1fr)']}
            gap={24}
            py={20}
          >
            {useCases.map((useCase) => (
              <UseCaseCard useCase={useCase} key={useCase.title} />
            ))}
          </Grid>
        </Section>
      </main>
    </>
  )
}
