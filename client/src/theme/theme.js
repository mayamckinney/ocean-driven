import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";


const customTheme = extendTheme({
    colors: {
        // base --> https://smart-swatch.netlify.app/#849fc1
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
          50: '#e7f1ff',
          100: '#c9d5e9',
          200: '#a9bcd5',
          300: '#88a2c3',
          400: '#6783b1',
          500: '#4e6498',
          600: '#3c4a77',
          700: '#2a3156',
          800: '#171b36',
          900: '#040418',
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