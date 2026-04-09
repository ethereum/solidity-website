import { useMemo } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { ResponsiveBar } from '@nivo/bar'
import {
  getSurveyChartTheme,
  SURVEY_CHART_COLORS,
} from './surveyChartTheme'
import { estimateLeftMargin } from './labelMargin'

interface BarDatum {
  label: string
  value: number
  [key: string]: string | number
}

interface SurveyBarChartProps {
  data: BarDatum[]
  layout?: 'horizontal' | 'vertical'
  total?: number
}

export const SurveyBarChart: React.FC<SurveyBarChartProps> = ({
  data,
  layout = 'horizontal',
  total,
}) => {
  const { colorMode } = useColorMode()
  const theme = getSurveyChartTheme(colorMode)
  const isHorizontal = layout === 'horizontal'

  // Nivo renders horizontal bars bottom-to-top, so reverse
  // to put the highest values at the top
  const orderedData = isHorizontal ? [...data].reverse() : data

  const leftMargin = useMemo(() => {
    if (!isHorizontal) return 40
    return estimateLeftMargin(data.map((d) => d.label))
  }, [data, isHorizontal])

  const pct = (v: number) =>
    total ? `${Math.round((v / total) * 100)}%` : `${v}`

  return (
    <ResponsiveBar
      data={orderedData}
      keys={['value']}
      indexBy="label"
      layout={isHorizontal ? 'horizontal' : 'vertical'}
      theme={theme}
      colors={SURVEY_CHART_COLORS[0]}
      margin={{
        top: 10,
        right: isHorizontal ? 80 : 20,
        bottom: isHorizontal ? 20 : 60,
        left: leftMargin,
      }}
      padding={0.3}
      borderRadius={2}
      enableGridX={isHorizontal}
      enableGridY={!isHorizontal}
      axisBottom={
        isHorizontal
          ? null
          : {
              tickSize: 0,
              tickPadding: 8,
              tickRotation: data.length > 10 ? -45 : 0,
            }
      }
      axisLeft={
        isHorizontal
          ? {
              tickSize: 0,
              tickPadding: 8,
            }
          : null
      }
      label={(d) => pct(d.value as number)}
      labelSkipWidth={60}
      labelSkipHeight={20}
      labelTextColor={theme.background as string}
      tooltip={({ indexValue, value }) => (
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
          <strong>{indexValue}</strong>: {value}
          {total ? ` (${Math.round((Number(value) / total) * 100)}%)` : ''}
        </div>
      )}
      role="img"
      ariaLabel="Survey bar chart"
    />
  )
}
