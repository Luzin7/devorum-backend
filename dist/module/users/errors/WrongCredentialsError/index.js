"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongCredentialsError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class WrongCredentialsError extends Error {
    constructor() {
        super('Wrong credentials');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Unauthorized;
    }
}
exports.WrongCredentialsError = WrongCredentialsError;
//# sourceMappingURL=index.js.map