// DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
//const chalk = require('chalk');
//const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config/index');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true
  },
  {
    email: 'jhon@undefined.sh',
    name: 'jhon doe',
    password: config.defaultUserPassword
  },
  {
    email: 'doe@undefined.sh',
    name: 'Maria doe',
    password: config.defaultUserPassword
  }
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  });

  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();

    const promises = users.map(async user => {
      const userId = await createUser(mongoDB, user);
      //debug(chalk.green('User created with id:', userId));
      console.log('User created with id:', userId)
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    //debug(chalk.red(error));
    console.log(error)
    process.exit(1);
  }
}

seedUsers();