import { Flex } from '@chakra-ui/react'
import { Triangle } from '@/components'

const triangleVariants = [
  [
    // [x position, y position, rotation]
    [0, 1, 0],
    [0, 0, 180],
    [-2, 0, 180],
    [-1, 0, 0]
  ],
  [
    [-1, 1, 0],
    [-1, 0, 180],
    [-2, 0, 0],
    [0, 0, 0]
  ],
  [
    [-1, 1, 0],
    [0, 1, 180],
    [-1, 0, 180],
    [-2, 0, 0]
  ],
  [
    [-1, 1.2, 0],
    [-1, 0, 180],
    [-1, 0, 180],
    [-2, 0, 0]
  ],
].map((variant) => variant.map(([x, y, r]) => ({
  x: `translateX(${x * 50}%)`,
  y: `translateY(${y * -100}%)`,
  r: `rotate(${r}deg)`,
})))


interface TriangleProps {
  variantIndex?: number
}
export const Triangles: React.FC<TriangleProps> = ({ variantIndex = 0 }) => {
  let index = variantIndex % triangleVariants.length
  return (
    <Flex position="relative" h="100%" w="100%">
      {triangleVariants[index].map(({x, y, r}, i) => (
        <Triangle
          key={i+x+y+r}
          color={i === 0 ? 'a' : i === 1 ? 'c' : i === 2 ? 'd' : 'e'}
          position="absolute"
          top="50%"
          left="50%"
          transform={`${x} ${y} ${r}`}
        />
      ))}
    </Flex>
  )
}
