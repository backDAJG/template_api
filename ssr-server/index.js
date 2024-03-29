const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const session = require("express-session");
const helmet = require('helmet')

const { config } = require("./config/index");

const app = express();

app.use(express.json());
app.use(helmet())
app.use(cookieParser());
app.use(
  session({
    secret: config.sessionSecret,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//Basic strategy
require("./utils/auth/strategies/basic");
//OAuth Strategy
require("./utils/auth/strategies/oauth");
//Google Strategy
require("./utils/auth/strategies/google");
//Twitter Strategy
require("./utils/auth/strategies/twitter");
//Linkedin Strategy
require("./utils/auth/strategies/linkedin");
//Facebook Strategy
require("./utils/auth/strategies/facebook");

app.post("/auth/sign-in", async function (req, res, next) {
  passport.authenticate("basic", function (error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      const { token, user } = data;

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev,
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("auth/sign-up", async (req, res, next) => {
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user,
    });
    res.status(201).json({ message: "user created" });
  } catch (err) {
    next(err);
  }
});

app.get("/movies", async (req, res, next) => {});

app.post("/user-movies", async function (req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: userMovie,
    });

    if (status !== 201) {
      console.log("bad");
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/user-movies/:userMovieId", async function (req, res, next) {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "delete",
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"],
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });
    res.status(200).json(user);
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.status(200).json(user);
  }
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized);
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.status(200).json(user);
  }
);

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "SOME STATE" })
);

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev,
    });

    res.status(200).json(user);
  }
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res, next) => {
    if(!req.user) {
      next(boom.unauthorized())
    }

    const { token, ...user } = req.user

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    })

    res.status(200).json(user)
  }
);

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`);
});

/*
OAuth 2.0 es un estándar de la industria que nos permite implementar autorización.

OpenID Connect es una capa de autenticación que funciona sobre OAuth con métodos ya construidos.
*/
