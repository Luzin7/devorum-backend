"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
require("@infra/containers/index");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const zod_1 = require("zod");
const statusCodeMapper_1 = require("../statusCode/statusCodeMapper");
const zod_validation_error_1 = require("zod-validation-error");
const index_1 = require("@env/index");
const routes_1 = require("../routes");
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.DEV_URL,
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use(routes_1.routes);
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof zod_1.ZodError) {
        console.log('');
        const zodErr = (0, zod_validation_error_1.fromZodError)(err);
        if (index_1.env.NODE_ENV === 'dev')
            console.log(zodErr);
        return res.status(statusCodeMapper_1.statusCodeMapper.BadRequest).json({
            error: zodErr,
            statusCode: statusCodeMapper_1.statusCodeMapper.BadRequest,
            message: 'Cant be validate input user infos.',
        });
    }
    return res.status(statusCodeMapper_1.statusCodeMapper.InternalServerError).json({
        message: 'Internal server error',
        statusCode: statusCodeMapper_1.statusCodeMapper.InternalServerError,
    });
});
app.listen(index_1.env.PORT, () => console.log(`Server is listening on port ${index_1.env.PORT}`));
//# sourceMappingURL=app.js.map