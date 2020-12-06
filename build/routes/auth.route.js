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
const express_1 = require("express");
const passport = __importStar(require("passport"));
require("../middlewares/passport");
const githubAccessToken_middleware_1 = __importDefault(require("../middlewares/githubAccessToken.middleware"));
const googleAccessToken_middleware_1 = __importDefault(require("../middlewares/googleAccessToken.middleware"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class AuthRoute {
    constructor() {
        this.router = express_1.Router();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signup', validation_middleware_1.default(users_dto_1.CreateUserDto, 'body'), this.authController.signUp);
        this.router.post('/login', validation_middleware_1.default(users_dto_1.CreateUserDto, 'body'), this.authController.logIn);
        this.router.post('/logout', auth_middleware_1.default, this.authController.logOut);
        this.router.post(`/oauth/facebook`, [
            passport.authenticate('facebook-token', {
                session: false,
                scope: ['email'],
            }),
        ], this.authController.authenticateSocial, (error, req, res, next) => {
            if (error) {
                res.status(400).send(error.message);
            }
        });
        this.router.post(`/oauth/google`, [
            googleAccessToken_middleware_1.default,
            passport.authenticate('google-oauth-token', {
                session: false,
                scope: ['email'],
            }),
        ], this.authController.authenticateSocial, (error, req, res, next) => {
            if (error) {
                res.status(400).send(error.message);
            }
        });
        this.router.post(`/oauth/github`, [
            githubAccessToken_middleware_1.default,
            passport.authenticate('github-token', {
                session: false,
                scope: ['email'],
            }),
        ], this.authController.authenticateSocial, (error, req, res, next) => {
            if (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map