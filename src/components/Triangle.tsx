import { createIcon } from '@chakra-ui/react'

const WIDTH: number = 100 as const
const HEIGHT: number = WIDTH * Math.sqrt(3) / 2

export const Triangle = createIcon({
  displayName: 'Triangle',
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  defaultProps: {
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    fill: 'currentColor',
  },
  d: `M${WIDTH/2} 0L0 ${HEIGHT}L${WIDTH} ${HEIGHT}L${WIDTH/2} 0Z`,
})
