import { useRef } from 'react'
import {
  AnimatePresence,
  easeOut,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import { Triangle } from '@/components'
import dynamic from 'next/dynamic'
import {
  TRIANGLES_PADDING as PAD,
  TRIANGLE_VARIANTS,
  VARIANT_PX_HEIGHT_NEEDED as MIN_H,
  TRIANGLE_HEIGHT as H,
  TRIANGLE_WIDTH as W,
} from '@/constants'
import { TrianglePlacementProps, VariantName } from '@/interfaces'

const variantProps: { [key: VariantName]: TrianglePlacementProps[] } = {}
Object.entries(TRIANGLE_VARIANTS).forEach(
  ([name, coords]) =>
    (variantProps[name] = coords.map(([left, top, rotate, color]) => ({
      left: `calc(50% + ${((left - 1) * W) / 2}px)`,
      top: `calc(100% - ${H}px - ${PAD}px - ${
        top * H
      }px)`,
      rotate: `${rotate}deg`,
      color,
    })))
)

interface TriangleProps {
  variant: VariantName
}
const TrianglesComponent: React.FC<TriangleProps> = ({ variant }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'center center'],
  })
  const scale = useTransform(scrollYProgress, [0.5, 0.9], [0, 1], {
    ease: easeOut
  })
  const y = useTransform(scrollYProgress, [0, 0.7], [500, 0], {
    ease: easeOut,
  })

  return (
    <Flex
      position="relative"
      h={`${MIN_H[variant]}px`}
      w="100%"
      m={4}
      ref={targetRef}
    >
      <AnimatePresence>
        {variantProps[variant].map(({ left, top, rotate, color }, i) => (
          <motion.div
            key={i + left + top + rotate + color}
            // drag
            // dragConstraints={targetRef}
            // dragElastic={0.1}
            style={{
              position: 'absolute',
              display: 'block',
              top,
              left,
              y,
              rotate,
              scale,
              transformStyle: 'preserve-3d',
            }}
          >
            <Triangle color={color} />
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
