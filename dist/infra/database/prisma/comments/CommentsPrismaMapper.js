"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsPrismaMapper = void 0;
const Comment_1 = require("@module/comments/entities/Comment");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class CommentsPrismaMapper {
    static toEntity(raw) {
        return Comment_1.Comment.create({
            authorId: new UniqueId_1.UniqueId(raw.authorId),
            content: raw.content,
            topicId: new UniqueId_1.UniqueId(raw.topicId),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new UniqueId_1.UniqueId(raw.id));
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
exports.CommentsPrismaMapper = CommentsPrismaMapper;
//# sourceMappingURL=CommentsPrismaMapper.js.map