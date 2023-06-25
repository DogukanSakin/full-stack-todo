/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        small: 10,
        medium: 12,
        large: 14,
        xlarge: 16,
        xxlarge: 18,
        xxxlarge: 20,
        header: 30,
      },
      colors: {
        lightOpacity : 'rgba(255,255,255,0.2)',
        quarterOpacity : 'rgba(255,255,255,0.4)',
        halfOpacity : 'rgba(255,255,255,0.5)',
        threeQuarterOpacity : 'rgba(255,255,255,0.7)',
        white : '#ffffff',
        primary: '#4a29ab',
      },
      fontFamily: {
        "family-black": ["family-black"],
        "family-bold": ["family-bold"],
        "family-extraBold": ["family-extraBold"],
        "family-semiBold": ["family-semiBold"],
        "family-medium": ["family-medium"],
        "family-regular": ["family-regular"],
      },
    },
  },
  plugins: [],
}

