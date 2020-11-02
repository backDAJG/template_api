const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UserServices = require('../services/users');
const { config } = require('../config/index');
const ApiKeysServices = require('../services/apiKeys');
const validationHandler = require('../utils/middleware/validationHandler');
const {
  createUserSchema,
  createProviderUserSchema,
} = require('../utils/schema/users');
// Basic Strategy
require('../utils/auth/startegies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);
  const apiKeyServices = new ApiKeysServices();
  const userService = new UserServices();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', (err, user) => {
      try {
        if (err || !user) {
          next(boom.unauthorized());
        }

        req.logIn(user, { session: false }, async (err) => {
          if (err) {
            next(err);
          }
          const apiKey = await apiKeyServices.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m',
          });
          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;

      try {
        const createdUserId = await userService.createUser({ user });
        res.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/sign-provider',
    validationHandler(createProviderUserSchema),
    async (req, res, next) => {
      const { body } = req;

      const { apiKeyToken, ...user } = body;

      if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'));
      }

      try {
        const queriedUser = await userService.getOrCreateUSer({ user });
        const apiKey = await apiKeyServices.getApiKey({ token: apiKeyToken });

        if (!apiKey) {
          next(boom.unauthorized());
        }

        const { _id: id, name, email } = queriedUser;
        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes,
        };

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m',
        });
        res.status(200).json({ token, user: { id, name, email } });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = authApi;
