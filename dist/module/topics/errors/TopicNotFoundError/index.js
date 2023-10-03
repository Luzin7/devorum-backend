"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicNotFoundError = void 0;
const statusCodeMapper_1 = require("@infra/http/statusCode/statusCodeMapper");
class TopicNotFoundError extends Error {
    constructor() {
        super('Topic not found');
        this.statusCode = statusCodeMapper_1.statusCodeMapper.Conflict;
    }
}
exports.TopicNotFoundError = TopicNotFoundError;
//# sourceMappingURL=index.js.map