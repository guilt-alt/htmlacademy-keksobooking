const path = require('path');

module.exports = {
  entry: [
    './js/util.js',
    './js/pins.js',
    './js/cards.js',
    './js/validation.js',
    './js/move.js',
    './js/messages.js',
    './js/backend.js',
    './js/filter.js',
    './js/events.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
