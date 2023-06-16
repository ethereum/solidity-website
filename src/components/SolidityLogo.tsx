import { createIcon } from '@chakra-ui/react'

const paths = [
  {
    opacity: 0.45,
    d: 'M84.5352 0L56.3437 50.1051H0L28.1721 0H84.5352Z',
  },
  {
    opacity: 0.6,
    d: 'M56.3435 50.1051H112.707L84.535 0H28.1719L56.3435 50.1051Z',
  },
  {
    opacity: 0.8,
    d: 'M28.1721 100.191L56.3437 50.1051L28.1721 0L0 50.1051L28.1721 100.191Z',
  },
  {
    opacity: 0.45,
    d: 'M28.4453 175.349L56.6368 125.243H113L84.8087 175.349H28.4453Z',
  },
  {
    opacity: 0.6,
    d: 'M56.6368 125.244H0.273438L28.4453 175.349H84.8087L56.6368 125.244Z',
  },
  {
    opacity: 0.8,
    d: 'M84.8049 75.1577L56.6328 125.243L84.8049 175.349L112.996 125.243L84.8049 75.1577Z',
  },
]

export const SolidityLogo = createIcon({
  displayName: 'Solidity Logo',
  viewBox: '0 0 113 176',
  defaultProps: {
    width: '113px',
    height: '176px',
    fill: 'currentColor',
  },
  path: paths.map((path) => <path key={path.d} {...path} />),
})
