/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ultramarine': {
                    '50': '#F5EDFA',
                    '100': '#EBDCF5',
                    '200': '#CCACE6',
                    '300': '#A97FD4',
                    '400': '#6736B5',
                    '500': '#2A0095',
                    '600': '#230085',
                    '700': '#1B006E',
                    '800': '#150059',
                    '900': '#0D0042',
                    '950': '#08002B'
                },
                primary: {
                    DEFAULT: '#3490dc',
                    '50': '#ebf5ff',
                    '100': '#e1effe',
                    '200': '#c3ddfd',
                    '300': '#a4cafe',
                    '400': '#76a9fa',
                    '500': '#3f83f8',
                    '600': '#1c64f2',
                    '700': '#1a56db',
                    '800': '#1e429f',
                    '900': '#233876',
                },
                secondary: {
                    DEFAULT: '#ffed4a',
                    '50': '#fff9e5',
                    '100': '#fff4cc',
                    '200': '#ffec99',
                    '300': '#ffe066',
                    '400': '#ffd43b',
                    '500': '#fcc419',
                    '600': '#faa307',
                    '700': '#f48e07',
                    '800': '#e85d04',
                    '900': '#d03801',
                },
            },
            backgroundImage: {
                'gradient-linear': 'linear-gradient(45deg, #6EE7B7 0%, #FFFA64 45%, #FF686B 90%)',
            },
            backgroundColor: {
                'fav': '#2A0095',
            },

            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
                mono: ['Menlo', 'monospace'],
                display: ['Oswald', 'sans-serif'],
                body: ['Open Sans', 'sans-serif'],
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },
        },
    },
    plugins: [],
}
