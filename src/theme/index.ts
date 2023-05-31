import { extendTheme } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import { config } from './foundations'
const overrides = {
  config,
  colors: {
    gray: {
      500: '#777777',
      700: '#464646',
      800: '#383838',
    },
  },
  components: {},
  fonts: {
    heading: "'Overpass Mono', monospace",
    body: "'Overpass', sans-serif",
    mono: "'Overpass Mono', monospace",
  },
  fontSizes: {
    '4xl': '2.75rem',
    '5xl': '3.25rem',
    '6xl': '4rem',
  },
  shadows: {},
  sizes: {},
  styles: {
    global: () => ({
      '*': {
        boxSizing: 'border-box',
        scrollBehavior: 'smooth',
        scrollMarginTop: '5rem',
        padding: 0,
        margin: 0,
      },
      body: {
        transition: 'background 200ms linear !important',
      },
    }),
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'fg',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: '6xl',
      color: 'fg',
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: '4xl',
      color: 'fg',
    },
    body: {
      fontFamily: 'body',
      fontWeight: 'regular',
      fontSize: 'sm',
      color: 'fg',
    },
  },
  semanticTokens: {
    colors: {
      primary: 'gray.600',
      fg: 'black',
      bg: 'white',
    },
  },
}

export default extendTheme(overrides)
