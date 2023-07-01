import { useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const useColorContinuity = () => {
  const { setColorMode } = useColorMode()
  const router = useRouter()
  // Look for `color` (preferred color mode) search query, can be `light` or `dark`
  const { color } = router.query
  if (color && ['light', 'dark'].includes(color as string)) {
    setColorMode(color)
    // Update URL with color search query removed
    router.replace(router.pathname, undefined, { shallow: true })
  }
}
