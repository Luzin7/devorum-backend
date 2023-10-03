export class CommentCreatedEvent {
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
//# sourceMappingURL=CommentCreatedEvent.js.map