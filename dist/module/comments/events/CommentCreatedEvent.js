"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreatedEvent = void 0;
class CommentCreatedEvent {
    constructor(comment) {
        this._comment = comment;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this._comment.id;
    }
    get comment() {
        return this._comment;
    }
}
exports.CommentCreatedEvent = CommentCreatedEvent;
//# sourceMappingURL=CommentCreatedEvent.js.map