import { useRef } from 'react'
import { Box, chakra, Flex, shouldForwardProp, Text } from '@chakra-ui/react'
import {
  motion,
  useTransform,
  useScroll,
  isValidMotionProp,
} from 'framer-motion'

const labels = [
  'pragma',
  'contract',
  'function',
  'modifier',
  'event',
  'struct',
  'enum',
  'require',
  'address',
]

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})

export const PragmaWatermark: React.FC = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 200, 300], [0, 200, 250], {
    clamp: false,
  })
  const lineHeight = useTransform(scrollY, [200, 2000], [1.4, 2])
  return (
    <Box
      display={{ base: 'none', md: 'flex' }}
      position="absolute"
      top={0}
      insetEnd={8}
      zIndex={-2}
    >
      <motion.aside style={{ y }}>
        {labels.map((label, i) => (
          <Box
            key={label}
            fontFamily="mono"
            fontSize={{ base: '5xl', lg: '6xl' }}
            opacity="5%"
            textAlign="end"
          >
            <motion.p style={{ lineHeight }}>{label}</motion.p>
          </Box>
        ))}
      </motion.aside>
    </Box>
  )
}
