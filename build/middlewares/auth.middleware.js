"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_entity_1 = require("../entities/users.entity");
const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            const verificationResponse = (await jsonwebtoken_1.default.verify(cookies.Authorization, secret));
            const userId = verificationResponse.id;
            const findUser = await users_entity_1.User.findOne(userId, { select: ['id', 'email', 'password'] });
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    }
    catch (error) {
        next();
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map