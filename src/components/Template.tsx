import { Box } from '@chakra-ui/react'
import { Footer, Header } from '@/components'
import { useColorContinuity } from '@/hooks'
import { AppProps } from 'next/app'

interface TemplateProps extends Pick<AppProps, 'Component' | 'pageProps'> {}
export const Template: React.FC<TemplateProps> = ({ Component, pageProps }) => {
  useColorContinuity()
  return (
    <Box textStyle="body" maxW="container.xl" mx="auto">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Box>
  )
}
