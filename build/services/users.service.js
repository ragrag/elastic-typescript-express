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
const Boom = __importStar(require("@hapi/boom"));
const users_entity_1 = require("../entities/users.entity");
const util_1 = require("../utils/util");
class UserService {
    async findAllUser() {
        const users = await users_entity_1.User.find();
        return users;
    }
    async findUserById(userId) {
        const findUser = await users_entity_1.User.findOne(userId);
        if (!findUser)
            throw Boom.conflict();
        return findUser;
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw Boom.badRequest();
        const findUser = await users_entity_1.User.findOne({ where: { email: userData.email } });
        if (findUser)
            throw Boom.conflict(`You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = await users_entity_1.User.save(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (util_1.isEmpty(userData))
            throw Boom.badRequest();
        const findUser = await users_entity_1.User.findOne({ where: { id: userId } });
        if (!findUser)
            throw Boom.notFound();
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        await users_entity_1.User.update(userId, Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        const updateUser = await users_entity_1.User.findOne({ where: { id: userId } });
        return updateUser;
    }
    async deleteUser(userId) {
        const findUser = await users_entity_1.User.findOne({ where: { id: userId } });
        if (!findUser)
            throw Boom.notFound();
        await users_entity_1.User.delete({ id: userId });
        return findUser;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map