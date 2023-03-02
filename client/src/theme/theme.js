import { extendTheme, theme as base, withDefaultColorScheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
        primary: '#ebfffb',
        secondary: '#7efaff',
        tertiary: '#13abc4',
        quaternary: '#3161a3',
        brand: {
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
        }
    },
    fonts: {
        // All headings will use josefin fonts but fallback to default theme fonts 
        heading: `Josefin Sans, ${base.fonts.heading}`,
        // All body text will use this font but fallback to default theme fonts 
        body: `Open Sans, ${base.fonts.body}`
    },
},
withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Button', 'Link'],
}),)  

export default customTheme;