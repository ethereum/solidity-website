import { extendTheme } from '@chakra-ui/react'
import { config } from './foundations'
const overrides = {
  config,
  colors: {},
  components: {},
  fonts: {},
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
  textStyles: {},
  semanticTokens: {
    colors: {
      primary: { _light: 'blue.300', _dark: 'blue.800' },
    },
  },
}

export default extendTheme(overrides)
