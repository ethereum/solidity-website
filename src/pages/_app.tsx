import { ChakraProvider, localStorageManager } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Fonts, PageLayout } from '@/components'
import theme from '@/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
      <Fonts />
      <PageLayout Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  )
}
