//const chalk = require('chalk');
//const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../lib/mongo');
const { moviesMock } = require('../../utils/mocks/movies');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(async (movie) => {
      await mongoDB.create('movies', movie);
    });

    await Promise.all(promises);
    //debug(chalk.green(`${promises.length} movies have been created successfully`))
    console.log(`${promises.length} movies have been created successfully`);
    return process.exit(0);
  } catch (err) {
    //debug(chalk.red(err));
    console.log(err)
    process.exit(1);
  }
}

seedMovies();
