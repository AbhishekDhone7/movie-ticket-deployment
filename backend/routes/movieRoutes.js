const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Movie = require('../module/MovieSchema'); // Ensure this path is correct

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received request to add movie');
    const { name, rating, year, category } = req.body;
    const image = req.file.path;

    console.log('Movie details:', { name, rating, year, category, image });

    if (!name || !rating || !year || !category || !image) {
      throw new Error('Missing required fields');
    }

    const newMovie = new Movie({ name, rating, year, category, image });
    await newMovie.save();
    console.log('Movie saved successfully');
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding movie:', error.message);
    res.status(500).json({ message: 'Error adding movie', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('Received request to fetch movies');
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
});

module.exports = router;
