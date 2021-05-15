const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const authApi = require('./routes/auth');
const userMoviesApi = require('./routes/userMovies');
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler')
const corsOptions = { origin: "http://example.com" };

app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions));

authApi(app)
moviesApi(app);
userMoviesApi(app)
//CATCH 404
app.use(notFoundHandler)
//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
