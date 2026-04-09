import type { PartialTheme } from '@nivo/theming'

const FONT_FAMILY = "'Overpass', sans-serif"

const colors = {
  light: {
    background: '#FAF8FF',
    text: '#2B247C',
    ticks: '#672AC8',
    grid: '#E6E3EC',
    tooltipBg: '#ffffff',
    tooltipText: '#2B247C',
  },
  dark: {
    background: '#110C4E',
    text: '#E6E3EC',
    ticks: '#9F94E8',
    grid: '#3D35A0',
    tooltipBg: '#2B247C',
    tooltipText: '#E6E3EC',
  },
}

export const SURVEY_CHART_COLORS = [
  '#9F94E8',
  '#AEC0F1',
  '#5554D9',
  '#672AC8',
  '#E6E3EC',
  '#2B247C',
]

export const SURVEY_GROUPED_COLORS = ['#AEC0F1', '#9F94E8', '#E6E3EC']

export function getSurveyChartTheme(
  colorMode: 'light' | 'dark'
): PartialTheme {
  const c = colors[colorMode]
  return {
    background: c.background,
    text: {
      fill: c.text,
      fontFamily: FONT_FAMILY,
      fontSize: 13,
    },
    axis: {
      ticks: {
        text: {
          fill: c.ticks,
          fontFamily: FONT_FAMILY,
          fontSize: 12,
        },
        line: { stroke: c.grid },
      },
      legend: {
        text: {
          fill: c.text,
          fontFamily: FONT_FAMILY,
          fontSize: 14,
        },
      },
    },
    grid: {
      line: { stroke: c.grid, strokeWidth: 1 },
    },
    labels: {
      text: {
        fill: c.text,
        fontFamily: FONT_FAMILY,
        fontSize: 12,
      },
    },
    legends: {
      text: {
        fill: c.text,
        fontFamily: FONT_FAMILY,
        fontSize: 12,
      },
    },
    tooltip: {
      container: {
        background: c.tooltipBg,
        color: c.tooltipText,
        fontFamily: FONT_FAMILY,
        fontSize: 13,
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      },
    },
  }
}
