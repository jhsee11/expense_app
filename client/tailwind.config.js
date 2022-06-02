module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }
      cutoff: '850px',

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1
    },
  },
  plugins: [require('flowbite/plugin')],
};
