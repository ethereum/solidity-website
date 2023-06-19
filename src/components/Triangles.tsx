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
    <Flex position="relative" minH="calc(86.6px * 2 + 64px)" w="100%" bg="blackAlpha.100" p={8} ref={targetRef} borderRadius="lg" >
      <AnimatePresence>
        {triangleVariants[index].map(({ x, y, r }, i) => (
          <motion.div
            drag
            dragConstraints={targetRef}
            dragElastic={0.1}
            whileDrag={{ rotateY: 180 }}
            key={i + x + y + r}
            style={{
              position: "absolute",
              display: "block",
              top: '50%',
              left: '50%',
              x,
              y,
              rotateZ: r,
              scale,
              transformStyle: 'preserve-3d'
            }}
          >
            <Triangle color={['a', 'c', 'd', 'e'][i]} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  )
}
