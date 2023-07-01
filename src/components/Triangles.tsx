import { useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import { Triangle } from '@/components'

type TriangleCoord = [number, number, number, string]
type Variant = TriangleCoord[]
const variants: Variant[] = [
  // [x position (<-0+>), y position (0 Base, +Up), rotation (0/180), color token]
  [
    [1, 1, 0, 'a'],
    [1, 0, 180, 'c'],
    [-1, 0, 180, 'd'],
    [0, 0, 0, 'e'],
  ],
  [
    [0, 1, 0, 'a'],
    [0, 0, 180, 'c'],
    [-1, 0, 0, 'd'],
    [1, 0, 0, 'e'],
  ],
  [
    [0, 1, 0, 'a'],
    [1, 1, 180, 'c'],
    [0, 0, 180, 'd'],
    [-1, 0, 0, 'e'],
  ],
  [
    [0.2, 1.2, 0, 'a'],
    [0, 0, 180, 'c'],
    [0, 0, 180, 'd'],
    [-1, 0, 0, 'e'],
  ],
  [
    [-1, 0, 0, 'a'],
    [-1, 0, 0, 'c'],
    [0, 0, 180, 'd'],
    [1, 0, 0, 'e'],
  ],
]

interface TrianglePlacementProps {
  x: string
  y: string
  r: string
  c: string
}
type VariantProps = TrianglePlacementProps[]

const variantProps: VariantProps[] = variants.map((variant) =>
  variant.map(([x, y, r, c]) => ({
    x: `${(x - 1) * 50}%`,
    y: `${y * -100}%`,
    r: `${r}deg`,
    c: c as string,
  }))
)

interface TriangleProps {
  variantIndex?: number
}
export const Triangles: React.FC<TriangleProps> = ({ variantIndex = 0 }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const index = variantIndex % variantProps.length
  return (
    <Flex
      position="relative"
      minH="calc(86.6px * 2 + 64px)"
      w="100%"
      p={8}
      ref={targetRef}
    >
      <AnimatePresence>
        {variantProps[index].map(({ x, y, r, c }, i) => (
          <motion.div
            key={i + x + y + r + c}
            drag
            dragConstraints={targetRef}
            dragElastic={0.1}
            style={{
              position: 'absolute',
              display: 'block',
              top: '50%',
              left: '50%',
              x,
              y,
              rotate: r,
              scale,
              transformStyle: 'preserve-3d',
            }}
          >
            <Triangle color={c} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  )
}
