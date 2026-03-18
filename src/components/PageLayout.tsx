import { Box, useColorMode } from '@chakra-ui/react'
import { Footer, Header } from '@/components'
import { useColorContinuity } from '@/hooks'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Link } from '@/components'

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

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <>
      {/* Banner - hidden until there is new content to display */}
      <Box
        display="none"
        bg={isDark ? '#AEC0F1' : '#2B247C'}
        color={isDark ? '#2B247C' : '#AEC0F1'}
        py={3}
        px={4}
        textAlign="center"
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight="medium"
        zIndex={9999}
        position="relative"
      >
        Add call to action content here when relevant and unhide the box.
      </Box>

      <Box textStyle="body" maxW="container.xl" mx="auto">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </>
  )
}
