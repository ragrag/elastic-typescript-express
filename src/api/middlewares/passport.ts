/* eslint-disable @typescript-eslint/no-var-requires */
import passport from 'passport';

import JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
import FacebookTokenStrategy = require('passport-facebook-token');
import GitHubTokenStrategy = require('passport-github-token');
import GoogleTokenStrategy = require('passport-google-oauth-token');
import { User } from '../../entities/users.entity';

passport.use(
  new JwtCookieComboStrategy(
    {
      secretOrPublicKey: process.env.JWT_SECRET,
      jwtCookieName: 'Authorization',
    },
    async (payload: any, done: any) => {
      try {
        const user = await User.findOne(payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v6.0',
      profileFields: ['id', 'displayName', 'emails', 'name'],
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user: User = await User.findOne({
          where: {
            socialProvider: 'facebook',
            socialProviderId: profile.id,
          },
        });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@facebook.com`;

        const newUser: User = await User.create({
          displayName: profile.displayName,
          email: email,
          socialProvider: 'facebook',
          socialProviderId: profile.id,
          photo: profile?.photos[0]?.value ?? '',
          verified: true,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user: User = await User.findOne({
          where: {
            socialProvider: 'google',
            socialProviderId: profile.id,
          },
        });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@google.com`;
        const newUser: User = await User.create({
          displayName: profile.displayName,
          email: email,
          socialProvider: 'google',
          socialProviderId: profile.id,
          verified: true,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

passport.use(
  new GitHubTokenStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      passReqToCallback: false,
      scope: 'user:email',
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const user: User = await User.findOne({
          where: {
            socialProvider: 'github',
            socialProviderId: `${profile.id}`,
          },
        });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@github.com`;
        const newUser: User = await User.create({
          displayName: profile.displayName,
          email: email,
          socialProvider: 'github',
          socialProviderId: profile.id,
          photo: profile?.photos[0]?.value ?? '',
          verified: true,
        });

        done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
