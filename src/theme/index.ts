import { extendTheme } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import { config } from './foundations'
const overrides = {
  config,
  colors: {
    purple: {
      300: '#9F94E8',
      500: '#5554D9',
      600: '#672AC8',
      900: '#2B247C',
    },
    blue: {
      200: '#AEC0F1',
    },
    gray: {
      200: '#E6E3EC',
    },
  },
  components: {},
  fonts: {
    heading: "'Overpass', sans-serif",
    body: "'Overpass', sans-serif",
    mono: "'Overpass Mono', monospace",
  },
  fontSizes: {
    '2xl': '1.75rem',
    '3xl': '2.375rem',
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
        color: 'text',
      },
    }),
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'header',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: { base: '4xl', md: '6xl' },
      color: 'text',
      lineHeight: '1.4',
      textWrap: 'balance',
    },
    h2: {
      fontFamily: 'heading',
      fontSize: '3xl',
      color: 'header',
      lineHeight: '1.27',
      textWrap: 'balance',
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: '2xl',
      color: 'header',
      lineHeight: '1.2',
      textWrap: 'balance',
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      fontSize: 'lg',
      color: 'header',
      lineHeight: '1.1',
      textWrap: 'balance',
    },
    body: {
      fontFamily: 'body',
      fontWeight: 'regular',
      fontSize: 'sm',
      color: 'text',
    },
  },
  semanticTokens: {
    colors: {
      a: { _light: 'purple.900', _dark: 'gray.200' }, // text
      b: { _light: 'purple.600', _dark: 'blue.200' },
      c: { _light: 'purple.500', _dark: 'purple.300' },
      d: { _light: 'purple.300', _dark: 'purple.500' },
      e: { _light: 'blue.200', _dark: 'purple.600' },
      f: { _light: 'gray.200', _dark: 'purple.900' }, // background

      text: 'a',
      bg: 'f',
      header: 'b',
      border: 'a',
      primary: 'c',
    },
  },
}

export default extendTheme(overrides)
