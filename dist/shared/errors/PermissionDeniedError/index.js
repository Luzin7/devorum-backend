"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDeniedError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class PermissionDeniedError extends Error {
    constructor() {
        super('Permission denied');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Unauthorized;
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
//# sourceMappingURL=index.js.map