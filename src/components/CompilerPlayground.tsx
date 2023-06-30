import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Flex,
  FlexProps,
  Grid,
  Select,
  Text,
  Textarea,
  TextareaProps,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import '@uiw/react-textarea-code-editor/dist.css'
import { examples } from '@/data'

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
)

const ResultTextarea: React.FC<TextareaProps> = (props) => (<Textarea
  readOnly
  flex={1}
  resize="vertical"
  fontSize="xs"
  p={2}
  {...props}
/>)
interface CompilerResult {
  evm: {
    assembly: string
    bytecode: { object: string }
    gasEstimates: { creation: { totalCost: string } }
  }
}

interface CompilerResultState {
  assembly: string
  bytecode: string
  totalCost: string
  version: string
  contractName: string
  bytes?: string
}

export const CompilerPlayground: React.FC<FlexProps> = (props) => {
  const { colorMode } = useColorMode()
  const [worker, setWorker] = useState<Worker | null>(null)
  const [code, setCode] = useState<string>(examples.get('helloWorld'))
  const [compilerResults, setCompilerResults] = useState<CompilerResultState>({
    assembly: '',
    bytecode: '',
    totalCost: '',
    contractName: '',
    version: '',
  })
  const { assembly, bytecode, totalCost, version, contractName } = compilerResults
  const bytes: number = bytecode.length / 2
  useEffect(() => {
    // Guard for undefined Worker type
    if (typeof Worker === 'undefined') return
    // Instantiate a new worker, based on `bundle.js` file
    // See: https://github.com/r0qs/solcjs-webworker-example
    const newWorker = new Worker('./bundle.js')
    // Listen for messages FROM the worker, with compiler results
    newWorker.addEventListener(
      'message',
      function (e: MessageEvent) {
        console.log({ e })
        const { version: _version }: { version: string } = e.data
        const contract: { [key: string]: CompilerResult } =
          e.data.output.contracts['']
        const [_contractName, result]: [string, CompilerResult] =
          Object.entries(contract)[0]
        const {
          evm: {
            assembly: _assembly,
            bytecode: { object: _bytecode },
            gasEstimates: {
              creation: { totalCost: _totalCost },
            },
          },
        } = result
        setCompilerResults({
          assembly: _assembly,
          bytecode: _bytecode,
          totalCost: _totalCost,
          contractName: _contractName,
          version: _version,
        })
      },
      false
    )
    setWorker(newWorker)
  }, [])

  useEffect(() => {
    // Guard for null worker
    if (!worker) return
    // Every time `code` changes, post a message TO the worker
    worker.postMessage({ contractCode: code })
  }, [worker, code])

  const onSelectionChange = (e: any) => {
    if (!e?.target?.value) return
    setCode(examples.get(e.target.value))
  }
  const handleCodeChange = (evn: any) => {
    setCode(evn.target.value)
  }
  const editorHeight = useBreakpointValue({ base: '300px', md: '500px'})
  return (
    <Flex direction="column" w="full" gap={2} {...props}>
      <Select bg="mode" onChange={onSelectionChange} w="fit-content">
        <option value="helloWorld">Hello World!</option>
        <option value="erc20">ERC20</option>
        <option value="simpleAuction">Simple Auction</option>
      </Select>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <CodeEditor
          value={code}
          language="sol"
          placeholder="pragma solidity ^0.8.20;"
          onChange={handleCodeChange}
          data-color-mode={colorMode}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: 'var(--chakra-colors-mode)',
            height: editorHeight,
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
          maxW="100%"
          textOverflow="ellipsis"
        >
          <Text fontWeight="bold" fontSize="lg">Compiler result</Text>

          <Text fontWeight="bold">
            Compiler version:{' '}
            <Text as="span" fontWeight="normal">
              {version}
            </Text>
          </Text>
          
          <Text fontWeight="bold">
            {contractName} ({bytes} bytes)
          </Text>

          <Text>Deployment costs: {totalCost} gas</Text>

          <Text fontWeight="bold">
            Bytecode
          </Text>
          <ResultTextarea value={bytecode} />

          <Text fontWeight="bold">
            Assembly
          </Text>
          <ResultTextarea value={assembly} />

        </Flex>
      </Grid>
    </Flex>
  )
}
