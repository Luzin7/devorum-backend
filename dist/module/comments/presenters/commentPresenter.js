export class CommentPresenter {
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
//# sourceMappingURL=commentPresenter.js.map