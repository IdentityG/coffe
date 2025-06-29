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
        // Primary Colors - Updated to match client request
        coffee: {
          DEFAULT: '#6B4423', // Coffee brown (slightly adjusted)
          light: '#8B6E55',   // Lighter coffee
          dark: '#523A28',    // Dark roast
          black: '#1E1410'    // Almost black coffee
        },
        cream: {
          DEFAULT: '#E8DCC5', // Beige (updated from cream)
          light: '#F5EFE0',   // Light beige
          dark: '#D8CDB5'     // Dark beige
        },
        caramel: {
          DEFAULT: '#D4A24E', // Rich caramel (kept as is)
          light: '#E6B366',   // Light caramel
          dark: '#BF8830'     // Dark caramel
        },
        mocha: {
          DEFAULT: '#9B7653', // Mocha brown (kept as is)
          light: '#B79372',   // Light mocha
          dark: '#7C5C3F'     // Dark mocha
        },
        espresso: {
          DEFAULT: '#2C5530', // Forest green (replacing espresso)
          light: '#3D7445',   // Light forest green
          dark: '#1E3D21'     // Dark forest green
        },

        // Accent Colors - Slightly adjusted for harmony
        cinnamon: '#A45C41',  // Warm spice accent (kept as is)
        vanilla: '#E8DCC5',   // Beige (updated from vanilla)
        chocolate: '#3C2A21', // Deep chocolate (kept as is)
        
        // UI Colors - Updated for consistency
        background: {
          light: '#F5EFE0',   // Light beige background
          dark: '#1E1410'     // Dark background
        },
        text: {
          primary: '#1E1410',  // Primary text
          secondary: '#6B4423', // Secondary text (coffee brown)
          light: '#E8DCC5'     // Light text (beige)
        },
        border: {
          light: '#D8CDB5',    // Light borders (dark beige)
          dark: '#6B4423'      // Dark borders (coffee brown)
        }
      }
    }
  }
};