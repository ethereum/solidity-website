import { useRef } from 'react'
import {
  AnimatePresence,
  easeOut,
  motion,
  useMotionValue,
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
      top: `calc(100% - ${H}px - ${PAD}px - ${top * H}px)`,
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
  const scale = useTransform(scrollYProgress, [0.2, 0.7], [0, 1], {
    ease: easeOut,
  })
  const y = useTransform(scrollYProgress, [0, 0.5], [500, 0], {
    ease: easeOut,
  })
  const xDrag = useMotionValue(0)
  const scaleDrag = useTransform(xDrag, [-150, 0, 150], [1.5, 1, 1.5])
  const rotateDrag = useTransform(xDrag, [-150, 0, 150], [-90, 0, 90])
  return (
    <Flex
      position="relative"
      h={`${MIN_H[variant]}px`}
      w="100%"
      m={4}
      ref={targetRef}
    >
      <AnimatePresence>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            x: xDrag,
            scale: scaleDrag,
            rotate: rotateDrag,
            cursor: 'grab',
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragElastic={0.125}
          whileTap={{ cursor: 'grabbing' }}
        >
          {variantProps[variant].map(({ left, top, rotate, color }, i) => (
            <motion.div
              key={i + left + top + rotate + color}
              style={{
                position: 'absolute',
                display: 'block',
                top,
                left,
                y,
                rotate,
                scale,
              }}
            >
              <Triangle color={color} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Flex>
  )
}

export default TrianglesComponent

export const Triangles = dynamic(
  () => import('@/components/Triangles').then((mod) => mod.default),
  { ssr: false }
)
