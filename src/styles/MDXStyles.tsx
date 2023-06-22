import {
  Divider,
  // Flex,
  Heading,
  Image,
  Stack,
  // Table,
  Text,
} from '@chakra-ui/react'
import { Link } from '@/components'

export const MDXStyles = {
  p: ({ children }: any) => (
    <Text fontSize="lg" lineHeight="150%" mb={{ base: 4, md: 6 }}>
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
      textStyle="h2"
      mt={{ base: 12, md: 0 }}
      mb={{ base: 4, md: 7 }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children, id }: any) => (
    <Heading
      as="h3"
      textStyle="h3"
      mt={{ base: 8, md: 0 }}
      mb={{ base: 4, md: 6 }}
    >
      {children}
    </Heading>
  ),
  h4: ({ children, id }: any) => (
    <Heading as="h4" textStyle="h4">
      {children}
    </Heading>
  ),
  pre: ({ children }: any) => (
    <Stack mb={5}>
      <pre>{children}</pre>
    </Stack>
  ),
  // table: ({ children }: any) => (
  //   <Flex maxW="min(100%, 100vw)" overflowX="scroll">
  //     <Table
  //       variant="striped"
  //       border="1px"
  //       borderColor="blackAlpha.50"
  //       mb={10}
  //       size={{ base: 'sm', lg: 'md' }}
  //       w="auto"
  //     >
  //       {children}
  //     </Table>
  //   </Flex>
  // ),
  img: (img: any) => {
    return <Image display="block" mx="auto" src={img.src} alt={img.alt} />
  },
  hr: ({ children }: any) => {
    return <Divider my={6}>{children}</Divider>
  },
}
