"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const typeorm_1 = require("typeorm");
const database_1 = require("./database");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
class App {
    constructor(routes) {
        this.app = express_1.default();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    connectToDatabase() {
        typeorm_1.createConnection(database_1.dbConnection)
            .then(() => {
            logger_1.logger.info('🟢 The database is connected.');
        })
            .catch((error) => {
            logger_1.logger.error(`🔴 Unable to connect to the database: ${error}.`);
        });
    }
    initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan_1.default('combined', { stream: logger_1.stream }));
            this.app.use(cors_1.default({ origin: 'your.domain.com', credentials: true }));
        }
        else if (this.env === 'development') {
            this.app.use(morgan_1.default('dev', { stream: logger_1.stream }));
            this.app.use(cors_1.default({ origin: true, credentials: true }));
        }
        this.app.use(hpp_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default(process.env.JWT_SECRET));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/api/v1/', route.router);
        });
    }
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs',
                },
            },
            apis: ['swagger.yaml'],
        };
        const specs = swagger_jsdoc_1.default(options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map