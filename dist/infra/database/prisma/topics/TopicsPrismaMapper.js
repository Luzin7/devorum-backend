"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsPrismaMapper = void 0;
const Topic_1 = require("@module/topics/entities/Topic");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class TopicsPrismaMapper {
    static toEntity(raw) {
        return Topic_1.Topic.create({
            authorId: new UniqueId_1.UniqueId(raw.authorId),
            content: raw.content,
            title: raw.title,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, new UniqueId_1.UniqueId(raw.id));
    }
    static toPrisma(topic) {
        return {
            authorId: topic.authorId.toString(),
            content: topic.content,
            title: topic.title,
            updatedAt: topic.updatedAt,
            createdAt: topic.createdAt,
            id: topic.id.toString(),
        };
    }
}
exports.TopicsPrismaMapper = TopicsPrismaMapper;
//# sourceMappingURL=TopicsPrismaMapper.js.map