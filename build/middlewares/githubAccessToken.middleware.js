"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getGithubAccessToken = async (req, res, next) => {
    try {
        const githubCode = req.body.code;
        const response = await axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: githubCode,
            redirect_uri: process.env.NODE_ENV === 'production' ? 'https://www.yourdomain.com/oauth/github' : 'http://localhost:3001/oauth/google',
        }, {});
        if (!response.data.includes('access_token'))
            throw new Error();
        let accessToken = response.data.split('&')[0];
        accessToken = accessToken.split('access_token=')[1];
        req.body.access_token = accessToken;
        next();
    }
    catch (err) {
        res.status(400).send('Something went wrong during Github Authentication');
    }
};
exports.default = getGithubAccessToken;
//# sourceMappingURL=githubAccessToken.middleware.js.map