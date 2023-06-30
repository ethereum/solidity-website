import { Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { Code, Link } from '@/components'
// TODO: Debug tables

export const MDXStyles = {
  p: ({ children }: any) => (
    <Text fontSize="xl" lineHeight="150%" mb={{ base: 4, md: 6 }}>
      {children}
    </Text>
  ),
  a: ({ children, href }: any) => (
    <Link textStyle="link" href={href}>
      {children}
    </Link>
  ),
  h2: ({ children, id }: any) => (
    <Heading
      as="h2"
      id={id}
      textStyle="h2"
      color="text"
      mt={{ base: 12, md: 0 }}
      mb={{ base: 4, md: 7 }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children, id }: any) => (
    <Heading
      as="h3"
      id={id}
      textStyle="h3"
      color="text"
      mt={{ base: 8, md: 0 }}
      mb={{ base: 4, md: 6 }}
    >
      {children}
    </Heading>
  ),
  h4: ({ children, id }: any) => (
    <Heading as="h4" id={id} textStyle="h4" color="text">
      {children}
    </Heading>
  ),
  h5: ({ children }: any) => (
    <Heading as="h5" textStyle="h5-mono" color="text">
      {children}
    </Heading>
  ),
  h6: ({ children }: any) => (
    <Heading as="h6" textStyle="h6-mono" color="text">
      {children}
    </Heading>
  ),
  pre: ({ children }: any) => (
    <Stack mb={5}>
      <pre>{children}</pre>
    </Stack>
  ),
  code: ({ children, inline, node: { properties } }: any) => (
    <Code inline={inline} properties={properties}>
      {children}
    </Code>
  ),
  img: (img: any) => {
    return <Image display="block" mx="auto" src={img.src} alt={img.alt} />
  },
  hr: ({ children }: any) => {
    return <Divider my={6}>{children}</Divider>
  },
}
