"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("@hapi/boom");
const logger_1 = require("../utils/logger");
function errorMiddleware(error, req, res) {
    const statusCode = boom_1.isBoom(error) ? error.output.statusCode : 500;
    const errorMessage = boom_1.isBoom(error) ? error.message : 'Something went wrong';
    logger_1.logger.error(`StatusCode : ${status}, Message : ${errorMessage}`);
    return res.status(statusCode).send(errorMessage);
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map