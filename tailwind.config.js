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
