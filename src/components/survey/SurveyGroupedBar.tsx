import { useColorMode } from '@chakra-ui/react'
import { ResponsiveBar } from '@nivo/bar'
import {
  getSurveyChartTheme,
  SURVEY_GROUPED_COLORS,
} from './surveyChartTheme'

interface SurveyGroupedBarProps {
  data: Record<string, string | number>[]
  keys: string[]
  layout?: 'horizontal' | 'vertical'
}

export const SurveyGroupedBar: React.FC<SurveyGroupedBarProps> = ({
  data,
  keys,
  layout = 'vertical',
}) => {
  const { colorMode } = useColorMode()
  const theme = getSurveyChartTheme(colorMode)
  const isHorizontal = layout === 'horizontal'

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="label"
      groupMode="grouped"
      layout={isHorizontal ? 'horizontal' : 'vertical'}
      theme={theme}
      colors={SURVEY_GROUPED_COLORS}
      margin={{
        top: 10,
        right: 20,
        bottom: isHorizontal ? 20 : 80,
        left: isHorizontal ? 140 : 50,
      }}
      padding={0.2}
      innerPadding={2}
      borderRadius={2}
      enableGridX={isHorizontal}
      enableGridY={!isHorizontal}
      axisBottom={
        isHorizontal
          ? null
          : {
              tickSize: 0,
              tickPadding: 8,
              tickRotation: data.length > 6 ? -45 : 0,
            }
      }
      axisLeft={
        isHorizontal
          ? { tickSize: 0, tickPadding: 8 }
          : {
              tickSize: 0,
              tickPadding: 8,
              format: (v) => `${v}%`,
            }
      }
      valueFormat={(v) => `${Number(v).toFixed(0)}%`}
      labelSkipWidth={32}
      labelSkipHeight={16}
      labelTextColor={theme.background as string}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom',
          direction: 'row',
          translateY: isHorizontal ? 0 : 70,
          itemsSpacing: 16,
          itemWidth: 120,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: 'circle',
        },
      ]}
      tooltip={({ id, indexValue, value }) => (
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
          <strong>{indexValue}</strong> - {id}: {Number(value).toFixed(1)}%
        </div>
      )}
      role="img"
      ariaLabel="Survey grouped bar chart"
    />
  )
}
