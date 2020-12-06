"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getGoogleAccessToken = async (req, res, next) => {
    try {
        const googleCode = req.body.code;
        const response = await axios_1.default.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            code: googleCode,
            redirect_uri: process.env.NODE_ENV === 'production' ? 'https://www.yourdomain.com/oauth/google' : 'http://localhost:3001/oauth/google',
            grant_type: 'authorization_code',
        }, {});
        req.body.access_token = response.data.access_token;
        next();
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send('Something went wrong during Google Authentication');
    }
};
exports.default = getGoogleAccessToken;
//# sourceMappingURL=googleAccessToken.middleware.js.map