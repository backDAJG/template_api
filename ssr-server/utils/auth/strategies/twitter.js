const passport = require("passport");
const axios = require("axios");
const { get } = require("lodash");
const { Strategy: TwitterStrategy } = require("passport-twitter");

const { config } = require("../../../config/index");
const boom = require("@hapi/boom");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.twitterConsumerKey,
      consumerSecret: config.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, cb) => {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-provider`,
        method: "post",
        data: {
          name: profile.displayName,
          email: get(
            profile,
            "emails.0.values",
            `${profile.username}@twitter.com`
          ),
          password: profile.id,
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    }
  )
);
