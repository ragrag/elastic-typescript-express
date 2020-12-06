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
const _ = __importStar(require("lodash"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.signUp = async (req, res, next) => {
            try {
                const userData = req.body;
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({ id: signUpUserData.id });
            }
            catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next) => {
            try {
                const userData = req.body;
                const { token, findUser } = await this.authService.login(userData);
                res.cookie('Authorization', token, {
                    httpOnly: true,
                    signed: true,
                    sameSite: 'strict',
                    secure: true,
                });
                const userResponse = _.pick(req.user, ['email', 'displayName', 'id']);
                res.status(200).json(Object.assign(Object.assign({}, userResponse), { token }));
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.authenticateSocial = async (req, res, next) => {
            const { token } = await this.authService.createToken(req.user);
            res.cookie('Authorization', token, {
                httpOnly: true,
                signed: true,
                sameSite: 'strict',
                secure: true,
            });
            const userResponse = _.pick(req.user, ['email', 'displayName', 'id']);
            return res.status(200).json(Object.assign({ token: token }, userResponse));
        };
        this.logOut = async (req, res, next) => {
            try {
                res.clearCookie('Authorization');
                res.status(200).send();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map