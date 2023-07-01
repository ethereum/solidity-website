import { createIcon } from '@chakra-ui/react'
import { TRIANGLE_WIDTH as W, TRIANGLE_HEIGHT as H } from '@/constants'

export const Triangle = createIcon({
  displayName: 'Triangle',
  viewBox: `0 0 ${W} ${H}`,
  defaultProps: {
    width: `${W}px`,
    height: `${H}px`,
    fill: 'currentColor',
  },
  d: `M${W / 2} 0L0 ${H}L${W} ${H}L${W / 2} 0Z`,
})
