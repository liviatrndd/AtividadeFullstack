const express = require('express');
const app = express();
const moviesRoutes = express.Router();

let Movies = require('../models/Movies');

// 1 add filme
moviesRoutes.route('/add').post(function (req, res) {
    let movies = new Movies(req.body);
    movies.save()
    .then(movies => {
      res.status(200).json({'status': 'success','mssg': 'a new movie has been added'});
    })
    .catch(err => {
      res.status(409).send({'status': 'failure','mssg': 'could not add to database, check info'});
    });
  });

// 2 listar filmes
moviesRoutes.route('/').get(function (req, res) {
  Movies.find().exec()
    .then(function (movies) {
      res.status(200).json({'status': 'success', 'movies': movies});
    })
    .catch(function (err) {
      res.status(400).send({'status': 'failure', 'mssg': 'Algo deu errado'});
    });
});

// 3 pegar filme pelo id
moviesRoutes.route('/srch/:title').get(function (req, res) {
  let title = req.params.title;
  Movies.findOne({ title: title }).select('-_id -__v').exec()
    .then(function (movie) {
      res.status(200).json({'status': 'success', 'movie': movie});
    })
    .catch(function (err) {
      res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
    });
});

// achar filme pelo título

moviesRoutes.route('/srch').get(function (req, res) {
  let title = req.query.title;
  Movies.findOne({ title: title }).select('-_id -__v').exec()
    .then(function (movie) {
      res.status(200).json({'status': 'success', 'movie': movie});
    })
    .catch(function (err) {
      res.status(400).send({'status': 'failure', 'mssg': 'Something went wrong'});
    });
});

// 4 update
moviesRoutes.route('/update/:id').put(function (req, res) {
    Movies.findById(req.params.id, function(err, movies) {
    if (!movies){
      res.status(400).send({'status': 'failure','mssg': 'Could not find the movie'});
    } else {
        movies.title = req.body.title;
        movies.synopsis = req.body.synopsis;
        movies.year = req.body.year;
        movies.poster = req.body.poster;

        movies.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update completed'});
      })
    }
  });
});

//5 apagar filme
moviesRoutes.route('/delete/:id').delete(function (req, res) {
  Movies.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Successfully deleted movie'});
    }
  });
 });

module.exports = moviesRoutes;