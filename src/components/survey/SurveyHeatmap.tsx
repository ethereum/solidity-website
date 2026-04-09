import { useMemo } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { getSurveyChartTheme } from './surveyChartTheme'
import { estimateLeftMargin } from './labelMargin'

interface HeatmapCell {
  x: string
  y: number
}

interface HeatmapRow {
  id: string
  data: HeatmapCell[]
}

interface SurveyHeatmapProps {
  data: HeatmapRow[]
}

export const SurveyHeatmap: React.FC<SurveyHeatmapProps> = ({ data }) => {
  const { colorMode } = useColorMode()
  const theme = getSurveyChartTheme(colorMode)

  const purpleScale =
    colorMode === 'dark'
      ? [
          '#0e0a3d',
          '#1a1560',
          '#272080',
          '#3D35A0',
          '#4A44B5',
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
          '#4A44B5',
          '#3D35A0',
          '#272080',
          '#1a1560',
        ]

  const maxValue = useMemo(() => {
    let max = 0
    for (const row of data) {
      for (const cell of row.data) {
        if (cell.y > max) max = cell.y
      }
    }
    return max
  }, [data])

  const isPercentage = maxValue <= 100

  // Apply sqrt transform to spread the color scale across the
  // actual data range. Without this, Nivo's linear quantize wastes
  // most color steps on empty ranges (e.g. 32-100% when max is 32%).
  const { displayData, displayMax } = useMemo(() => {
    const sqrtMax = Math.sqrt(maxValue)
    const transformed = data.map((row) => ({
      ...row,
      data: row.data.map((cell) => ({
        ...cell,
        y: Math.sqrt(cell.y),
      })),
    }))
    return { displayData: transformed, displayMax: sqrtMax }
  }, [data, maxValue])

  // Labels show real values by squaring back
  const formatValue = isPercentage
    ? (v: number) => `${Math.round(Number(v) ** 2)}%`
    : (v: number) => `${Math.round(Number(v) ** 2)}`

  const textColorThreshold = displayMax * 0.5
  const numColumns = data[0]?.data.length || 0
  const reversed = [...displayData].reverse()
  const leftMargin = estimateLeftMargin(data.map((r) => r.id))

  return (
    <ResponsiveHeatMap
      data={reversed}
      theme={theme}
      margin={{
        top: 10,
        right: 20,
        bottom: 60,
        left: leftMargin,
      }}
      valueFormat={formatValue}
      axisTop={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: numColumns > 6 ? -45 : 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
      }}
      colors={{
        type: 'quantize' as const,
        colors: purpleScale,
        steps: purpleScale.length,
      }}
      emptyColor={purpleScale[0]}
      borderWidth={1}
      borderColor={theme.background as string}
      labelTextColor={({ value }) => {
        const v = typeof value === 'number' ? value : Number(value)
        if (colorMode === 'dark') {
          return v > textColorThreshold ? '#2B247C' : '#E6E3EC'
        }
        return v > textColorThreshold ? '#E6E3EC' : '#2B247C'
      }}
      tooltip={({ cell }) => (
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
          <strong>{cell.serieId}</strong> / {cell.data.x}:{' '}
          {isPercentage
            ? `${(Number(cell.data.y) ** 2).toFixed(1)}%`
            : Math.round(Number(cell.data.y) ** 2)}
        </div>
      )}
    />
  )
}
