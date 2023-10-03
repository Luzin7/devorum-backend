"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsWithAuthorMapper = void 0;
const TopicWithAuthor_1 = require("@module/topics/valueObjects/TopicWithAuthor");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class TopicsWithAuthorMapper {
    static toTopicWithAuthor(raw) {
        return TopicWithAuthor_1.TopicWithAuthor.create({
            authorId: new UniqueId_1.UniqueId(raw.author.id),
            authorName: raw.author.name,
            content: raw.content,
            topicCreatedAt: raw.createdAt,
            topicUpdatedAt: raw.updatedAt,
            topicId: new UniqueId_1.UniqueId(raw.id),
            numberOfComments: raw._count.comments,
        });
    }
}
exports.TopicsWithAuthorMapper = TopicsWithAuthorMapper;
//# sourceMappingURL=TopicsWithAuthorPrismaMapper.js.map