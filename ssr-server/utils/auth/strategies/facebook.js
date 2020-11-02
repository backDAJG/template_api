const axios = require("axios");
const passport = require("passport");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const boom = require("@hapi/boom");
const { config } = require("../../../config/index");

passport.use(
  new FacebookStrategy(
    {
      clientSecret: config.facebookSecretKey,
      clientID: config.facebookClientId,
      callbackURL: "/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-provider`,
        method: "post",
        data: {
            name: profile.displayName,
            email: `${profile.id}@facebook.com`,
            password: profile.id,
            apiKeyToken: config.apiKeyToken
        },
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    }
  )
);
