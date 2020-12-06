"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    envalid_1.cleanEnv(process.env, {
        NODE_ENV: envalid_1.str(),
        PORT: envalid_1.port(),
        DATABASE_URL_PROD: envalid_1.str(),
        DATABASE_URL_DEV: envalid_1.str(),
        FACEBOOK_APP_ID: envalid_1.str(),
        FACEBOOK_APP_SECRET: envalid_1.str(),
        GOOGLE_CLIENT_ID: envalid_1.str(),
        GOOGLE_CLIENT_SECRET: envalid_1.str(),
        GITHUB_CLIENT_ID: envalid_1.str(),
        GITHUB_CLIENT_SECRET: envalid_1.str(),
        JWT_SECRET: envalid_1.str(),
    });
};
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map