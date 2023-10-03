"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExitesError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class UserAlreadyExitesError extends Error {
    constructor() {
        super('User already existes');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.UserAlreadyExitesError = UserAlreadyExitesError;
//# sourceMappingURL=index.js.map