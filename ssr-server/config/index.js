const dotenv = require('dotenv').config()

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 8000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  linkedinClientId: process.env.LINKEDIN_CLIENT_ID,
  linkedinSecretKey: process.env.LINKEDIN_SECRET_KEY,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookSecretKey: process.env.FACEBOOK_SECRET_KEY
};

module.exports = { config: config }
