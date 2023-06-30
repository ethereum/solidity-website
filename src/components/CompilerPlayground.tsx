import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Box,
  Flex,
  FlexProps,
  Grid,
  Select,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import '@uiw/react-textarea-code-editor/dist.css'
import { examples } from '@/data'

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
)

export const CompilerPlayground: React.FC<FlexProps> = (props) => {
  const [code, setCode] = useState(examples.get('helloWorld'))
  const { colorMode } = useColorMode()
  useEffect(() => {
    document?.documentElement.setAttribute('data-color-mode', 'dark')
  }, [])
  const onSelectionChange = (e: any) => {
    if (!e?.target?.value) return
    setCode(examples.get(e.target.value))
  }
  // <Script src="mode-javascript.js" type="text/javascript" />
  // <Script src="mode-solidity.js" type="text/javascript" />
  // <Script src="compiler.js" type="text/javascript" />
  return (
    <Flex direction="column" w="full" gap={2} {...props}>
      <Select variant="outline" onChange={onSelectionChange}>
        <option value="helloWorld">Hello World!</option>
        <option value="erc20">ERC20</option>
        <option value="simpleAuction">Simple Auction</option>
      </Select>

      <Grid templateColumns={['1fr', null, 'repeat(2, 1fr)']}>
        <CodeEditor
          value={code}
          language="sol"
          placeholder="pragma solidity ^0.8.20;"
          onChange={(evn) => setCode(evn.target.value)}
          data-color-mode={colorMode}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            height: '400px',
            overflowY: 'scroll',
            resize: 'vertical',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
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
              ...
            </Text>
          </Text>
          <Box id="compiler_errors" w="full" h="100px" />
        </Flex>
      </Grid>
    </Flex>
  )
}
