import { Box, useColorModeValue, type BoxProps } from '@chakra-ui/react'
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
export const Map: React.FC<MapProps> = ({
  coordsOverride,
  location,
  ...boxProps
}) => {
  const filter = useColorModeValue('', 'invert(100%) hue-rotate(180deg) brightness(1.5)')
  return (
    <Box
      as="figure"
      sx={{
        '&>div': { w: 'full', h: 'full', filter },
        '&>div svg': { filter }
      }}
      {...boxProps}
    >
      <OpenStreetMap coordsOverride={coordsOverride} location={location} />
    </Box>
  )
}
