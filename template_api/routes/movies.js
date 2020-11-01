const express = require('express');
const MoviesService = require('../services/movies');
const {
  createMovieSchema,
  movieIdSchema,
  updateMovieSchema,
} = require('../utils/schema/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const moviesApi = (app) => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesServices = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await moviesServices.getMovies({
        tags,
      });
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const movie = await moviesServices.getMovie({
          movieId,
        });
        res.status(200).json({
          data: movie,
          message: 'movie retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createMovieId = await moviesServices.createMovie({
          movie,
        });
        res.status(201).json({
          data: createMovieId,
          message: 'movie created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesServices.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesServices.deleteMovie({
          movieId,
        });
        res.status(200).json({
          data: deleteMovieId,
          message: 'movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const modifiedMovie = await moviesServices.modifiedMovie({
        movieId,
      });
      res.status(200).json({
        data: modifiedMovie,
        message: 'modified movie',
      });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = moviesApi;
