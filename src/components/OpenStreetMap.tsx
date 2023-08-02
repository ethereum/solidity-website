import { icon } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import type { Coordinates } from '@/interfaces'
import {
  MAP_ZOOM_LEVEL,
  MARKER_ICON_PATH,
  MARKER_SHADOW_PATH,
  REMOTE_EVENTS_LOCATION,
} from '@/constants'
import 'leaflet/dist/leaflet.css'
import { Box, type BoxProps, Heading } from '@chakra-ui/react'

interface OpenStreetMapProps extends BoxProps {
  coordsOverride?: Coordinates | null
  location: string
  mapLabel: string
}
const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  coordsOverride,
  location,
  mapLabel,
  ...boxProps
}) => {
  const [coords, setCoords] = useState<Coordinates | null>(null)
  const ref = useRef(null)
  useEffect(() => {
    ;(async () => {
      try {
        if (location.toLowerCase() === REMOTE_EVENTS_LOCATION)
          throw new Error('Remote location, geocoding skipped')
        const provider = new OpenStreetMapProvider()
        const result = await provider.search({ query: location })
        if (!result.length)
          throw new Error(
            `Could not find geo-coordinates (lat/long) from location name: ${location}`
          )
        const { x: lng, y: lat } = result[0]
        setCoords(coordsOverride ?? { lat, lng })
      } catch (error) {
        setCoords(coordsOverride ?? null)
      }
    })()
  }, [coordsOverride, location])

  const marker = icon({
    iconUrl: MARKER_ICON_PATH,
    shadowUrl: MARKER_SHADOW_PATH,
    iconSize: [32, 64],
    iconAnchor: [16, 64],
    shadowSize: [53, 45],
    shadowAnchor: [0, 45],
  })

  return coords ? (
    <Box
      as="figure"
      sx={{
        '&>div': { w: 'full', h: 'full', minH: '300px' },
      }}
      {...boxProps}
    >
      <Heading
        as="h2"
        textStyle="h2"
        textAlign="center"
        color="text"
        mt={{ base: 12, md: 16 }}
        mb={{ base: 4, md: 6 }}
      >
        {mapLabel}
      </Heading>

      <MapContainer center={coords} zoom={MAP_ZOOM_LEVEL} ref={ref} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lng]} icon={marker} />
      </MapContainer>
    </Box>
  ) : null
}

export default OpenStreetMap
