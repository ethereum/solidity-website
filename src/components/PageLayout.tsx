import { Box, useColorMode } from '@chakra-ui/react'
import { Footer, Header } from '@/components'
import { useColorContinuity } from '@/hooks'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

interface PageLayoutProps extends Pick<AppProps, 'Component' | 'pageProps'> {}
export const PageLayout: React.FC<PageLayoutProps> = ({
  Component,
  pageProps,
}) => {
  useColorContinuity()

  const { toggleColorMode } = useColorMode()
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'Backslash') toggleColorMode()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleColorMode])

  return (
    <Box textStyle="body" maxW="container.xl" mx="auto">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Box>
  )
}
