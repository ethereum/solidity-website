import { Flex, Text } from '@chakra-ui/react'
import { Hero, PageMetadata, Section } from '@/components'
import { DOCS_URL } from '../../constants'

export default function Contribute() {
  return (
    <>
      <PageMetadata
        title="Contribute"
        description="Learn how to contribute to Solidity as an open source contributor."
      />
      <main>
        <Hero
          header="Contribute"
          description="The Solidity community is vibrant and continuously evolving. Many talented developers contribute to the language's growth, improvements, and wider adoption."
          cta={[{ name: 'Get started', href: DOCS_URL }]}
        />
        <Section>
          <Flex
            as="article"
            direction="column"
            gap={4}
            maxW="container.md"
            pt={28}
            pb={64}
            fontSize="md"
          >
            <Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              modi corrupti inventore repellat ea rerum, ut enim optio
              asperiores ipsa dolore deleniti excepturi. Voluptatem quisquam
              doloribus quod perferendis inventore? Vero?
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              aspernatur magnam iusto nam numquam et porro illum nulla, optio
              reprehenderit praesentium facilis, consectetur totam laborum nemo
              dolore expedita amet perferendis!
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              aspernatur magnam iusto nam numquam et porro illum nulla, optio
              reprehenderit praesentium facilis, consectetur totam laborum nemo
              dolore expedita amet perferendis!
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              aspernatur magnam iusto nam numquam et porro illum nulla, optio
              reprehenderit praesentium facilis, consectetur totam laborum nemo
              dolore expedita amet perferendis!
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              aspernatur magnam iusto nam numquam et porro illum nulla, optio
              reprehenderit praesentium facilis, consectetur totam laborum nemo
              dolore expedita amet perferendis!
            </Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              aspernatur magnam iusto nam numquam et porro illum nulla, optio
              reprehenderit praesentium facilis, consectetur totam laborum nemo
              dolore expedita amet perferendis!
            </Text>
          </Flex>
        </Section>
      </main>
    </>
  )
}
