const Movie = require('../module/MovieSchema');
const fs = require('fs');
const path = require('path');


exports.addMovie = async (req, res) => {
    try {
      const { name, rating, year } = req.body;
      const image = req.file.path;
      const newMovie = new Movie({ name, rating, year, image });
      await newMovie.save();
      res.status(201).json(newMovie);
      console.log("uploded")
    } catch (error) {
      res.status(500).json({ message: 'Error adding movie', error });
    }
  };
  
  exports.getMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching movies', error });
    }
  };