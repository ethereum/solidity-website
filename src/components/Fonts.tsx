import React from 'react'
import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css?family=Overpass:400,400i,700,700i|Overpass+Mono:400,400i,700,700i&display=swap');
    `}
  />
)
