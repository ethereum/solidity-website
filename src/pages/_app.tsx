import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Fonts } from '@/components'
import theme from '../theme'
import { Layout } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <Fonts />
      <Layout Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  )
}
