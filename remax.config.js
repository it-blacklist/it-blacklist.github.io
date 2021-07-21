const sass = require('@remax/plugin-sass');

module.exports = {
  one: true,
  output: 'dist/' + process.env.REMAX_PLATFORM,
  plugins:[sass()]
};
