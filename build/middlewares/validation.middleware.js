"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationMiddleware = (type, value = 'body', skipMissingProperties = false) => {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req[value]), { skipMissingProperties }).then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                res.status(400).send(message);
            }
            else {
                next();
            }
        });
    };
};
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map