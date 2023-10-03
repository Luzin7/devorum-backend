export class TopicsWithAuthorPresenter {
    static toHTTP(topicWithAuthor) {
        return {
            topicId: topicWithAuthor.topicId.toString(),
            authorId: topicWithAuthor.authorId.toString(),
            content: topicWithAuthor.content,
            authorName: topicWithAuthor.authorName,
            topicCreatedAt: topicWithAuthor.topicCreatedAt,
            topicUpdatedAt: topicWithAuthor.topicUpdatedAt,
            numberOfComments: topicWithAuthor.numberOfComments,
        };
    }
}
//# sourceMappingURL=topicWithAuthorPresenter.js.map