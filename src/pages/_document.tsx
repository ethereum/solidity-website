import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import theme from '../theme'

export default function Document() {
  const preloadFonts = [
    "overpass/overpass-regular.otf",
    "overpass/overpass-bold.otf",
    "overpass-mono/overpass-mono-regular.otf",
    "overpass-mono/overpass-mono-bold.otf",
  ];

  return (
    <Html lang="en">
      <Head>
        {preloadFonts.map((font) => (
          <link
            key={font}
            rel="preload"
            href={`/fonts/${font}`}
            as="font"
            crossOrigin=""
          />
        ))}
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
