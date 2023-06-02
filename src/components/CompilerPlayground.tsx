import {
  Box,
  Flex,
  Grid,
  Select,
  Text,
  SystemStyleObject,
} from '@chakra-ui/react'
import type { FlexProps } from '@chakra-ui/react'

import Script from 'next/script'

export const CompilerPlayground: React.FC<FlexProps> = (props) => {
  const sx: SystemStyleObject = {
    bg: ['whiteAlpha.700', null, 'bg'],
    gap: [4, null, 2],
    textarea: {
      display: 'block',
      p: 2,
      borderRadius: 'base',
      bg: 'gray.100',
      w: 'full',
      fontSize: 'xs',
      h: ['4rem', '6rem', '8rem'],
    },
  }

  return (
    <>
      <Script src="ace.js" type="text/javascript" />
      <Script src="mode-javascript.js" type="text/javascript" />
      <Script src="mode-solidity.js" type="text/javascript" />
      <Script src="compiler.js" type="text/javascript" />

      <Flex as="aside" direction="column" w="full" gap={2} {...props}>
        <Select id="selectedContract" w="fit-content" bg="bg">
          <option id="helloWorld">Hello World!</option>
          <option id="erc20">ERC20</option>
          <option id="simpleAuction">Simple Auction</option>
        </Select>

        <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']} sx={sx}>
          <Flex
            id="compilerInput"
            h={['15rem', '20rem', '30rem']}
            flex={1}
          />

          <Flex
            direction="column"
            gap={2}
            flex={1}
            p={2}
            h={['20rem', '25rem', '30rem']}
          >
            <Text fontWeight="bold">Compiler result</Text>
            <Text fontWeight="bold">
              Compiler version
              <br />
              <Text as="span" id="compiler_version" fontWeight="normal">
                Loading...
              </Text>
            </Text>
            <Box id="compiler_errors" w="full" h="100px" />
          </Flex>
        </Grid>
      </Flex>
    </>
  )
}
