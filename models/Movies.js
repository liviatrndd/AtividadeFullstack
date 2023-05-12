const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movies = new Schema({
    title: {
      type: String
    },
    synopsis: {
      type: String
    },
    year: {
      type: Number
    },
    poster: {
      type: String
    }
  },{
    collection: 'movies'
});

  module.exports = mongoose.model('Movies', Movies);
