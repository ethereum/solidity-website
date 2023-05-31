import { PageMetadata, Section } from '@/components'

export default function Home() {
  return (
    <>
      <PageMetadata
        title="Home"
        description="Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on Ethereum."
      />
      <main>
        <Section>Main section</Section>
      </main>
    </>
  )
}
