const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

app.use(express.json());

moviesApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
