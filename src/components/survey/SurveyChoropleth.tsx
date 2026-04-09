import { useEffect, useMemo, useState } from 'react'
import { Box, Spinner, useColorMode } from '@chakra-ui/react'
import { ResponsiveChoropleth } from '@nivo/geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import type { FeatureCollection } from 'geojson'
import { getSurveyChartTheme } from './surveyChartTheme'

interface ChoroplethDatum {
  id: string
  value: number
  name: string
}

interface SurveyChoroplethProps {
  data: ChoroplethDatum[]
}

export const SurveyChoropleth: React.FC<SurveyChoroplethProps> = ({
  data,
}) => {
  const { colorMode } = useColorMode()
  const theme = getSurveyChartTheme(colorMode)
  const [features, setFeatures] = useState<FeatureCollection['features']>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/world-countries.json')
      .then((res) => res.json())
      .then((topo: Topology) => {
        const geo = feature(topo, topo.objects.countries) as FeatureCollection
        setFeatures(geo.features)
        setLoading(false)
      })
  }, [])

  // Apply sqrt transform so the color scale spreads across the
  // heavily skewed distribution (most countries 1-30, a few 80-205).
  // Nivo only supports linear color mapping, so we transform the
  // values and adjust the domain to match. Tooltips still show
  // the real counts via the original data lookup.
  const { scaledData, maxScaled } = useMemo(() => {
    const scaled = data.map((d) => ({
      ...d,
      value: Math.sqrt(d.value),
    }))
    const max = Math.max(...scaled.map((d) => d.value))
    return { scaledData: scaled, maxScaled: max }
  }, [data])

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Spinner size="lg" color="primary" />
      </Box>
    )
  }

  const purpleScale =
    colorMode === 'dark'
      ? [
          '#1a1560',
          '#2a2080',
          '#3D35A0',
          '#4845B8',
          '#5554D9',
          '#7A74E0',
          '#9F94E8',
          '#BDB5F0',
          '#D5D0F5',
          '#E6E3EC',
        ]
      : [
          '#FAF8FF',
          '#EDE9F8',
          '#D5D0F5',
          '#BDB5F0',
          '#9F94E8',
          '#7A74E0',
          '#5554D9',
          '#4845B8',
          '#3D35A0',
          '#2B247C',
        ]

  const borderColor = colorMode === 'dark' ? '#110C4E' : '#E6E3EC'

  return (
    <ResponsiveChoropleth
      data={scaledData}
      features={features}
      theme={theme}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors={purpleScale}
      domain={[0, maxScaled]}
      unknownColor={colorMode === 'dark' ? '#1a1560' : '#F0EDF7'}
      projectionType="naturalEarth1"
      projectionScale={140}
      projectionTranslation={[0.5, 0.55]}
      borderWidth={0.5}
      borderColor={borderColor}
      legends={[]}
      tooltip={({ feature: f }) => {
        const featureId = (f as unknown as { id: string }).id
        const datum = data.find((d) => d.id === featureId)
        if (!datum) return null
        return (
          <div
            style={{
              background: theme.tooltip?.container?.background as string,
              color: theme.tooltip?.container?.color as string,
              padding: '8px 12px',
              borderRadius: '4px',
              fontFamily: "'Overpass', sans-serif",
              fontSize: 13,
            }}
          >
            <strong>{datum.name}</strong>: {datum.value} responses
          </div>
        )
      }}
    />
  )
}
