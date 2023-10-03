"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentNotCanBeUpdatedError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class CommentNotCanBeUpdatedError extends Error {
    constructor() {
        super('Comment not can update');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.CommentNotCanBeUpdatedError = CommentNotCanBeUpdatedError;
//# sourceMappingURL=index.js.map