const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler')

app.use(express.json());

moviesApi(app);
//CATCH 404
app.use(notFoundHandler)
//Errors middleware
app.use(logErrors);
app.use(errorHandler);
app.use(wrapErrors);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
