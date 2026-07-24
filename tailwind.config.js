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
                    50: '#fff7f8',
                    100: '#ffe7ec',
                    200: '#ffd0da',
                    300: '#ffb0c1',
                    400: '#ff7fa2',
                    500: '#f45b84',
                    600: '#e13f6d',
                    700: '#be315a',
                    800: '#9f294e',
                    900: '#852647',
                    950: '#4b1124',
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
