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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Boom = __importStar(require("@hapi/boom"));
const users_entity_1 = require("../entities/users.entity");
const util_1 = require("../utils/util");
class AuthService {
    async signup(userData) {
        if (util_1.isEmpty(userData))
            throw Boom.badRequest();
        const findUser = await users_entity_1.User.findOne({ where: { email: userData.email } });
        if (findUser)
            throw Boom.conflict(`You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = await users_entity_1.User.save(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmpty(userData))
            throw Boom.badRequest();
        const findUser = await users_entity_1.User.findOne({ where: { email: userData.email } });
        if (!findUser)
            throw Boom.notFound();
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw Boom.unauthorized();
        const { token } = this.createToken(findUser);
        return { token, findUser };
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }) };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map