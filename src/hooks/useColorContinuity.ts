import { useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const useColorContinuity = () => {
  const { setColorMode } = useColorMode()
  const router = useRouter()
  // Look for `pcm` (preferred color mode) search query, can be `light` or `dark`
  const { pcm } = router.query
  if (pcm && ['light', 'dark'].includes(pcm as string)) {
    setColorMode(pcm)
    // Update URL with pcm search query removed
    router.replace(router.pathname, undefined, { shallow: true })
  }
}
