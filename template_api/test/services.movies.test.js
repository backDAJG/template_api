const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MoviesServices = proxyquire('../service/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MoviesServices
  
  describe('when getMovies method is called', async () => {

  });
});
