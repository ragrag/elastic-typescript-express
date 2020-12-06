"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = __importStar(require("passport"));
const JwtCookieComboStrategy = __importStar(require("passport-jwt-cookiecombo"));
const FacebookTokenStrategy = __importStar(require("passport-facebook-token"));
const GitHubTokenStrategy = __importStar(require("passport-github-token"));
const passport_google_oauth_token_1 = __importDefault(require("passport-google-oauth-token"));
const users_entity_1 = require("../entities/users.entity");
passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: process.env.JWT_SECRET,
    jwtCookieName: 'Authorization',
}, async (payload, done) => {
    try {
        const user = await users_entity_1.User.findOne(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (err) {
        return done(err, false);
    }
}));
passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v6.0',
    profileFields: ['id', 'displayName', 'emails', 'name'],
}, async (accessToken, refreshToken, profile, done) => {
    var _a, _b;
    try {
        const user = await users_entity_1.User.findOne({
            where: {
                socialProvider: 'facebook',
                socialProviderId: profile.id,
            },
        });
        if (user) {
            return done(null, user);
        }
        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@facebook.com`;
        const newUser = await users_entity_1.User.create({
            displayName: profile.displayName,
            email: email,
            socialProvider: 'facebook',
            socialProviderId: profile.id,
            photo: (_b = (_a = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
            verified: true,
        });
        done(null, newUser);
    }
    catch (err) {
        return done(err, false);
    }
}));
passport.use(new passport_google_oauth_token_1.default({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await users_entity_1.User.findOne({
            where: {
                socialProvider: 'google',
                socialProviderId: profile.id,
            },
        });
        if (user) {
            return done(null, user);
        }
        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@google.com`;
        const newUser = await users_entity_1.User.create({
            displayName: profile.displayName,
            email: email,
            socialProvider: 'google',
            socialProviderId: profile.id,
            verified: true,
        });
        done(null, newUser);
    }
    catch (err) {
        return done(err, false);
    }
}));
passport.use(new GitHubTokenStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    passReqToCallback: false,
    scope: 'user:email',
}, async (accessToken, refreshToken, profile, done) => {
    var _a, _b;
    try {
        const user = await users_entity_1.User.findOne({
            where: {
                socialProvider: 'github',
                socialProviderId: `${profile.id}`,
            },
        });
        if (user) {
            return done(null, user);
        }
        const email = profile.emails[0].value ? profile.emails[0].value : `${profile.id}@github.com`;
        const newUser = await users_entity_1.User.create({
            displayName: profile.displayName,
            email: email,
            socialProvider: 'github',
            socialProviderId: profile.id,
            photo: (_b = (_a = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
            verified: true,
        });
        done(null, newUser);
    }
    catch (err) {
        return done(err, false);
    }
}));
//# sourceMappingURL=passport.js.map