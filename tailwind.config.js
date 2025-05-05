module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        // Primary Colors
        coffee: {
          DEFAULT: '#6F4E37', // Rich coffee brown
          light: '#8B6E55',   // Lighter coffee
          dark: '#523A28',    // Dark roast
          black: '#1E1410'    // Almost black coffee
        },
        cream: {
          DEFAULT: '#F5E6D3', // Creamy base
          light: '#FFF8F0',   // Light cream
          dark: '#E6D5BC'     // Dark cream
        },
        caramel: {
          DEFAULT: '#D4A24E', // Rich caramel
          light: '#E6B366',   // Light caramel
          dark: '#BF8830'     // Dark caramel
        },
        mocha: {
          DEFAULT: '#9B7653', // Mocha brown
          light: '#B79372',   // Light mocha
          dark: '#7C5C3F'     // Dark mocha
        },
        espresso: {
          DEFAULT: '#4A3728', // Rich espresso
          light: '#6B5241',   // Light espresso
          dark: '#2E2219'     // Dark espresso
        },

        // Accent Colors
        cinnamon: '#A45C41',  // Warm spice accent
        vanilla: '#F3E5AB',   // Soft vanilla
        chocolate: '#3C2A21', // Deep chocolate
        
        // UI Colors
        background: {
          light: '#FFF8F0',   // Light background
          dark: '#1E1410'     // Dark background
        },
        text: {
          primary: '#1E1410',  // Primary text
          secondary: '#6F4E37', // Secondary text
          light: '#F5E6D3'     // Light text
        },
        border: {
          light: '#E6D5BC',    // Light borders
          dark: '#6F4E37'      // Dark borders
        }
      }
    }
  }
};