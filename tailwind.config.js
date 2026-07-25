import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                rose: {
                    50: '#FEF0F0',
                    100: '#FEE2E2',
                    200: '#FCBFBF',
                    300: '#FA8989',
                    400: '#F84F4F',
                    500: '#F51414',
                    600: '#CE0909',
                    700: '#A20707',
                    800: '#7C0505',
                    900: '#580404',
                    950: '#310202',
                },
            },
            backgroundImage: {
                'main': 'url(/img/fondo.jpg)'
            },
            backgroundColor: {
                'black-0.6': 'rgba(0, 0, 0, 0.6)'
            }
        },
    },

    plugins: [forms],
};
