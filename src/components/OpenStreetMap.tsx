import { icon } from 'leaflet'
import { useRef } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import type { Coordinates } from '@/interfaces'
import {
  MAP_ZOOM_LEVEL,
  MARKER_ICON_PATH,
  MARKER_SHADOW_PATH,
} from '@/constants'
import 'leaflet/dist/leaflet.css'

// TODO: Fetch coords from API using location name
interface OpenStreetMapProps {
  coords: Coordinates
}
const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ coords }) => {
  const ref = useRef(null)
  const marker = icon({
    iconUrl: MARKER_ICON_PATH,
    shadowUrl: MARKER_SHADOW_PATH,
    iconSize: [32, 64],
    iconAnchor: [16, 64],
    shadowSize: [53, 45],
    shadowAnchor: [0, 45],
  })

  return (
    <MapContainer center={coords} zoom={MAP_ZOOM_LEVEL} ref={ref}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]} icon={marker} />
    </MapContainer>
  )
}

export default OpenStreetMap
