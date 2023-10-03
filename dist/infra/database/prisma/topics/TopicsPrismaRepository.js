"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsPrismaRepository = void 0;
const createConnection_1 = require("@infra/database/createConnection");
const TopicsPrismaMapper_1 = require("./TopicsPrismaMapper");
const TopicsWithAuthorPrismaMapper_1 = require("./TopicsWithAuthorPrismaMapper");
class TopicsPrismaRepository {
    async create(topic) {
        await createConnection_1.prisma.topic.create({
            data: TopicsPrismaMapper_1.TopicsPrismaMapper.toPrisma(topic),
        });
    }
    async findById(id) {
        const topic = await createConnection_1.prisma.topic.findUnique({
            where: {
                id,
            },
        });
        if (!topic) {
            return null;
        }
        return TopicsPrismaMapper_1.TopicsPrismaMapper.toEntity(topic);
    }
    async delete(id) {
        await createConnection_1.prisma.topic.delete({
            where: {
                id,
            },
        });
    }
    async save(topic) {
        await createConnection_1.prisma.topic.update({
            where: {
                id: topic.id.toString(),
            },
            data: TopicsPrismaMapper_1.TopicsPrismaMapper.toPrisma(topic),
        });
    }
    async findManyRecentWithAuthor({ page, perPage, }) {
        const topics = await createConnection_1.prisma.topic.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            skip: (page - 1) * perPage,
            take: page * perPage,
        });
        return topics.map(TopicsWithAuthorPrismaMapper_1.TopicsWithAuthorMapper.toTopicWithAuthor);
    }
}
exports.TopicsPrismaRepository = TopicsPrismaRepository;
//# sourceMappingURL=TopicsPrismaRepository.js.map