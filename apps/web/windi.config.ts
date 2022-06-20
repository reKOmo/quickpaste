import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    theme: {
        extend: {
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            colors: {
                orange: "#ed6a5a",
                bg: "#2c4a51",
                green: "#b6c649",
                white: "#fff",
                blue: "#aed9e0"
            },
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
});