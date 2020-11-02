const passport = require('passport')
const axios = require('axios')
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2')
const { config } = require('../../../config/index')
const boom = require('@hapi/boom')

passport.use(
    new LinkedInStrategy({
        clientID: config.linkedinClientId,
        clientSecret: config.linkedinSecretKey,
        callbackURL: "/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
    }, async (accessToken, refreshToken, profile, cb) => {
        console.log(profile.displayName)
        console.log(profile.emails[0].value)
        console.log(profile.id)
        const { data, status } = await axios({
            url: `${config.apiUrl}/api/auth/sign-provider`,
            method: "post",
            data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id,
                apiKeyToken: config.apiKeyToken
            }
        });

        console.log(data, status)

        if(!data || status !== 200) {
            cb(boom.unauthorized(), false)
        }

        return cb(null, data)
    })
)