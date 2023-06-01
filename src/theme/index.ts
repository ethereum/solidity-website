import { extendTheme } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import { config } from './foundations'
const overrides = {
  config,
  colors: {
    gray: {
      100: '#F2F2F2',
      200: '#EBEBEB',
      400: '#848484',
      500: '#777777',
      700: '#464646',
      800: '#383838',
      900: '#2D2D2D',
    },
  },
  components: {},
  fonts: {
    heading: "'Overpass Mono', monospace",
    body: "'Overpass', sans-serif",
    mono: "'Overpass Mono', monospace",
  },
  fontSizes: {
    '2xl': '1.75rem',
    '3xl': '2rem',
    '4xl': '2.75rem',
    '5xl': '3.25rem',
    '6xl': '4rem',
  },
  shadows: {},
  sizes: {
    container: {
      xs: '480px',
    },
  },
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
        bg: 'bg',
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
      fontSize: ['3xl', '3xl', '4xl', '5xl'],
      color: 'fg',
      lineHeight: '1.4',
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: ['2xl', '3xl', '4xl'],
      color: 'fg',
      lineHeight: '1.27',
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: ['lg', 'xl', '2xl'],
      color: 'fg',
      lineHeight: '1.2',
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: 'lg',
      color: 'fg',
      lineHeight: '1.1',
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
      primary: 'gray.700',
      fg: 'black',
      bg: 'white',
    },
  },
}

export default extendTheme(overrides)
