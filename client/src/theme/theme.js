import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";


const customTheme = extendTheme({
    colors: {
        // base --> https://smart-swatch.netlify.app/#2350ca
        primary: {
          50: '#e9f2ff',
          100: '#cbd4e8',
          200: '#abb7d4',
          300: '#8b9ac1',
          400: '#6b7dae',
          500: '#516394',
          600: '#3e4d74',
          700: '#2b3754',
          800: '#192135',
          900: '#050b18',
        },
        // base --> https://smart-swatch.netlify.app/#e0bbca
        secondary: {
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
          50: '#ebf1fd',
          100: '#cfd4e5',
          200: '#b0b8ce',
          300: '#929bba',
          400: '#727fa5',
          500: '#59658c',
          600: '#454f6d',
          700: '#31384f',
          800: '#1c2231',
          900: '#080b17',
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