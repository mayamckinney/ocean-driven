import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";


const customTheme = extendTheme({
    colors: {
        // base --> https://smart-swatch.netlify.app/#ebfffb
        primary: {
            50: '#e5fffa',
            100: '#bbfef0',
            200: '#8ffde5',
            300: '#66fddc',
            400: '#4cfdd3',
            500: '#40e4ba',
            600: '#32b191',
            700: '#237f67',
            800: '#114c3e',
            900: '#001a14',
        },
        // base --> https://smart-swatch.netlify.app/#7efaff
        secondary: {
            50: '#daffff',
            100: '#affdff',
            200: '#80faff',
            300: '#52f8ff',
            400: '#31f5fe',
            500: '#24dce5',
            600: '#12acb3',
            700: '#007b80',
            800: '#004a4e',
            900: '#001b1c'
        },
        // base --> https://smart-swatch.netlify.app/#13abc4
        tertiary: {
            50: '#dafdff',
            100: '#b1f0fb',
            200: '#86e6f5',
            300: '#58daf0',
            400: '#2ed0eb',
            500: '#14b7d1',
            600: '#008ea4',
            700: '#006575',
            800: '#003e49',
            900: '#00161c',
        },
        // base --> https://smart-swatch.netlify.app/#3161a3
        quaternary: {
            50: '#e4f2ff',
            100: '#c0d6f2',
            200: '#9bbae5',
            300: '#759ed7',
            400: '#4f83ca',
            500: '#3569b0',
            600: '#27528a',
            700: '#193a64',
            800: '#0c233f',
            900: '#000d1c',
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