import React from 'react'
import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      @import url("https://fonts.cdnfonts.com/css/overpass");
      @import url("https://fonts.cdnfonts.com/css/overpass-mono");
    `}
  />
)
