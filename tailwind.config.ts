import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'bg': '#fafafa', 
        'sidebarbg': '#dcdcde',
        'text': '#1d1c1d',
        'graytext': '#5F5C6F',
        'highlightblack': '#333133',
        'highlightgray': '#e2e1e2',
        'hihlightsidebar': '#cacaca',
        'bodergradientslight':'#e8e8e9',
        'bodergradientsdark':'#cbccce',
        'profileiconbg': '#b6b6b9',
        'main-bg':"#f3f3f3",
        'bordercolor':"#E3E3E3",
        'lightgraytext':"#757575",
        'naviblue':"#374957",
        'darkbg':"#121212",
        'darktext':"#b0b0b0"
      },
      boxShadow: {
        'around': '0 0 15px rgba(0, 0, 0, 0.1)',
        'custom': "0 2px 9px #e1e1e1ad",
        'popup':"0 30px 34px #00000026",
        'sidebar':"10px 0 31px #00000075",
      },
      animation: {
        expand: 'sidebarExpand 0.5s ease-in-out forwards',
        collapse: 'sidebarCollapse 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};

export default config;
