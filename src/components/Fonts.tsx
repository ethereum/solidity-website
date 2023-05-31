import React from 'react'
import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Overpass';
        font-style: light;
        font-weight: 300;
        font-display: swap;
        src: url("/fonts/overpass/overpass-light.otf");
      }
      @font-face {
        font-family: 'Overpass';
        font-style:  normal;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/overpass/overpass-regular.otf");
      }
      @font-face {
        font-family: 'Overpass';
        font-style:  medium;
        font-weight: 500;
        font-display: swap;
        src: url("/fonts/overpass/overpass-semibold.otf");
      }
      @font-face {
        font-family: 'Overpass';
        font-style:  bold;
        font-weight: 700;
        font-display: swap;
        src: url("/fonts/overpass/overpass-bold.otf");
      }
      @font-face {
        font-family: 'Overpass';
        font-style:  italic;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/overpass/overpass-italic.otf");
      }
      @font-face {
        font-family: 'Overpass Mono';
        font-style:  regular;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/overpass-mono/overpass-mono-regular.otf");
      }
      @font-face {
        font-family: 'Overpass Mono';
        font-style:  bold;
        font-weight: 700;
        font-display: swap;
        src: url("/fonts/overpass-mono/overpass-mono-bold.otf");
      }
    `}
  />
)
