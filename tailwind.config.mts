import flowbite from 'flowbite/plugin'
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,react}',
        './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {},
    },
    plugins: [
        flowbite,
        scrollbar
    ],
}
