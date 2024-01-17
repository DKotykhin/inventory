import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        colors: {
            white: '#ffffff',
            green: '#55aa00',
            red: '#f15922',
            grey: {
                DEFAULT: '#808080',
                50: '#f2f2f2',
                100: '#e6e6e6',
                200: '#cccccc',
                300: '#b3b3b3',
                400: '#999999',
                500: '#808080',
                600: '#666666',
                700: '#4d4d4d',
                800: '#333333',
                900: '#1a1a1a',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: '#55aa00',
                        },
                        secondary: {
                            DEFAULT: '#808080',
                        },
                        warning: {
                            DEFAULT: '#f15922',
                        },
                        divider: '#e6e6e6',
                    },
                },
            },
        }),
    ],
};
export default config;
