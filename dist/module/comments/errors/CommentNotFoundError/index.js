"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentNotFoundError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class CommentNotFoundError extends Error {
    constructor() {
        super('Comment not found comment');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.CommentNotFoundError = CommentNotFoundError;
//# sourceMappingURL=index.js.map