{import('tailwindcss').Config} 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'ui-purple':'#9090AC',
        'bg-purple':'#3D3C75',
        'card-border':'#7F7FA1',
      },
      borderRadius:{
        '4xl':'30px',
      }
    },
  },
  plugins: [],
}