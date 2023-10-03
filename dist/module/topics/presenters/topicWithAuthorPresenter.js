"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsWithAuthorPresenter = void 0;
class TopicsWithAuthorPresenter {
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
exports.TopicsWithAuthorPresenter = TopicsWithAuthorPresenter;
//# sourceMappingURL=topicWithAuthorPresenter.js.map