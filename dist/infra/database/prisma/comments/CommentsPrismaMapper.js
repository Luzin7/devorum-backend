import { Comment } from '@module/comments/entities/Comment';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class CommentsPrismaMapper {
    static toEntity(raw) {
        return Comment.create({
            authorId: new UniqueId(raw.authorId),
            content: raw.content,
            topicId: new UniqueId(raw.topicId),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new UniqueId(raw.id));
    }
    static toPrisma(comment) {
        return {
            authorId: comment.authorId.toString(),
            content: comment.content,
            topicId: comment.topicId.toString(),
            createdAt: comment.createdAt,
            id: comment.id.toString(),
            updatedAt: comment.updatedAt,
        };
    }
}
//# sourceMappingURL=CommentsPrismaMapper.js.map