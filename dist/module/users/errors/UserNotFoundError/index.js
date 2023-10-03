"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class UserNotFoundError extends Error {
    constructor() {
        super('User not found');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=index.js.map