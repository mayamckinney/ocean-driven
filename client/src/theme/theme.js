import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";


const customTheme = extendTheme({
    colors: {
        // base --> https://smart-swatch.netlify.app/#2350ca
        primary: {
          50: '#e4eeff',
          100: '#bcccf9',
          200: '#90abef',
          300: '#6689e6',
          400: '#3b67dd',
          500: '#224dc4',
          600: '#183c99',
          700: '#0f2b6f',
          800: '#051a45',
          900: '#00091d',
        },
        // base --> https://smart-swatch.netlify.app/#e0bbca
        secondary: {
          50: '#fcebf3',
          100: '#e7cad6',
          200: '#d5a8be',
          300: '#c486a7',
          400: '#b36493',
          500: '#9a4b80',
          600: '#783a67',
          700: '#56294d',
          800: '#351832',
          900: '#160616',
        },
        // base --> https://smart-swatch.netlify.app/#b84ba7
        tertiary: {
          50: '#ffeafc',
          100: '#ecc6e7',
          200: '#dda3d3',
          300: '#ce7ec1',
          400: '#be5aaf',
          500: '#a54195',
          600: '#813175',
          700: '#5c2354',
          800: '#391434',
          900: '#170416',
        },
        // base --> https://smart-swatch.netlify.app/#8947da
        quaternary: {
          50: '#f3e8ff',
          100: '#d7bef6',
          200: '#bb94ec',
          300: '#a06ae2',
          400: '#8440d9',
          500: '#6b26bf',
          600: '#531d96',
          700: '#3b146c',
          800: '#240b43',
          900: '#0f021b',
        },
    },
    fonts: {
        // All headings will use josefin fonts but fallback to default theme fonts 
        heading: `Josefin Sans, ${base.fonts.heading}`,
        // All body text will use this font but fallback to default theme fonts 
        body: `Open Sans, ${base.fonts.body}`
    },
},
    withDefaultColorScheme({
        colorScheme: 'quaternary',
        components: ['Button'],
    }),
    withDefaultVariant({
        variant: 'noUnderline',
        components: ['Link']
    })
)

export default customTheme;