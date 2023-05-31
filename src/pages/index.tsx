import { Text }  from '@chakra-ui/react'
import { Hero, Link, PageMetadata, Section } from '@/components'
import { DOCS_URL } from '../../constants'

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
          description={(
            <Text>
              A statically-typed curly-braces programming language designed for developing smart contracts that run on{' '}
              <Link href="https://ethereum.org">Ethereum</Link>.
            </Text>
          )}
          cta={[ {  name: 'Get to the docs', href: DOCS_URL } ]}
        />
        <Section>Main section</Section>
      </main>
    </>
  )
}
