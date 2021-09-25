const path = require('path');

module.exports = {
  appSrc: path.resolve(__dirname, '../..', 'src'),
  appIndex: path.resolve(__dirname, '../..', 'src/index.js'),
  appPublic: path.resolve(__dirname, '../..', 'public'),
  appBuild: path.resolve(__dirname, '../..', 'build'),
  appHtml: path.resolve(__dirname, '../..', 'public/index.html')
};
