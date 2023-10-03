"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationNotFoundError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class NotificationNotFoundError extends Error {
    constructor() {
        super('Notification not found');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.NotificationNotFoundError = NotificationNotFoundError;
//# sourceMappingURL=index.js.map