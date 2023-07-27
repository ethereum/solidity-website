import { Box, type BoxProps } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Coordinates } from '@/interfaces'

const OpenStreetMap = dynamic(
  () => import('@/components/OpenStreetMap').then((mod) => mod.default),
  { ssr: false }
)

interface MapProps extends BoxProps {
  coordsOverride?: Coordinates | null
  location: string
}
export const Map: React.FC<MapProps> = ({ coordsOverride, location, ...boxProps }) => (
  <Box as="figure" sx={{ '&>div': { w: 'full', h: 'full' } }} {...boxProps}>
    <OpenStreetMap coordsOverride={coordsOverride} location={location} />
  </Box>
)
