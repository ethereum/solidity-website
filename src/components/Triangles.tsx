import { useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import { Triangle } from '@/components'

const triangleVariants = [
  // [[color A coords], [color C coords], [color D coords], [color E coords]]
  [
    // [x position (<-0+>), y position (0 Base, +Up), rotation (0/180)]
    [1, 1, 0],
    [1, 0, 180],
    [-1, 0, 180],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, 180],
    [-1, 0, 0],
    [1, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 180],
    [0, 0, 180],
    [-1, 0, 0],
  ],
  [
    [0.2, 1.2, 0],
    [0, 0, 180],
    [0, 0, 180],
    [-1, 0, 0],
  ],
  [
    [-1, 0, 0],
    [-1, 0, 0],
    [0, 0, 180],
    [1, 0, 0],
  ],
].map((variant) =>
  variant.map(([x, y, r]) => ({
    x: `${(x - 1) * 50}%`,
    y: `${y * -100}%`,
    r: `${r}deg`,
  }))
)

interface TriangleProps {
  variantIndex?: number
}
export const Triangles: React.FC<TriangleProps> = ({ variantIndex = 0 }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "center center"]})
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  let index = variantIndex % triangleVariants.length
  return (
    <Flex position="relative" minH="calc(86.6px * 2 + 64px)" w="100%" bg="blackAlpha.100" p={8} ref={targetRef}>
      {triangleVariants[index].map(({ x, y, r }, i) => {
        const colorMap = ['a', 'c', 'd', 'e']
        return (
          <AnimatePresence key={i + x + y + r}>
            <motion.div
              style={{
                position: "absolute",
                width: 'fit-content',
                height: 'fit-content',
                top: '50%',
                left: '50%',
                x,
                y,
                rotate: r,
                scale,
              }}
              initial={{
                rotate: `-${r}`,
              }}
              animate={{
                rotate: r,
              }}
            >
              <Triangle color={colorMap[i]} />
            </motion.div>
          </AnimatePresence>
        )
      })}
    </Flex>
  )
}
