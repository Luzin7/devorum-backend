import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class TopicsWithAuthorMapper {
    static toTopicWithAuthor(raw) {
        return TopicWithAuthor.create({
            authorId: new UniqueId(raw.author.id),
            authorName: raw.author.name,
            content: raw.content,
            topicCreatedAt: raw.createdAt,
            topicUpdatedAt: raw.updatedAt,
            topicId: new UniqueId(raw.id),
            numberOfComments: raw._count.comments,
        });
    }
}
//# sourceMappingURL=TopicsWithAuthorPrismaMapper.js.map