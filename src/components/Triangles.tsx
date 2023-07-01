import { useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import { Triangle, HEIGHT, WIDTH } from '@/components'
import dynamic from 'next/dynamic'

const PAD = 32

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
    x: `calc(50% + ${((x - 1) * WIDTH) / 2}px)`,
    y: `calc(100% - ${HEIGHT}px - ${PAD}px - ${y * HEIGHT}px)`,
    r: `${r}deg`,
    c: c as string,
  }))
)
const variantPxHeightNeeded = variants.map(
  (variant) =>
    (variant.reduce((acc, [_, y]) => Math.max(y, acc), 0) + 1) * HEIGHT +
    2 * PAD
)

interface TriangleProps {
  variantIndex?: number
}
const TrianglesComponent: React.FC<TriangleProps> = ({ variantIndex = 0 }) => {
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
      h={`${variantPxHeightNeeded[index]}px`}
      w="100%"
      m={4}
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
              top: y,
              left: x,
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

export default TrianglesComponent

export const Triangles = dynamic(
  () => import('@/components/Triangles').then((mod) => mod.default),
  { ssr: false }
)