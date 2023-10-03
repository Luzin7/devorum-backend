"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPresenter = void 0;
class CommentPresenter {
    static toHTTP(comment) {
        return {
            id: comment.id.toString(),
            content: comment.content,
            updatedAt: comment.updatedAt,
            createdAt: comment.createdAt,
            authorId: comment.authorId.toString(),
            topicId: comment.topicId.toString(),
        };
    }
}
exports.CommentPresenter = CommentPresenter;
//# sourceMappingURL=commentPresenter.js.map