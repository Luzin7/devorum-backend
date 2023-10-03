import { prisma } from '@infra/database/createConnection';
import { TopicsPrismaMapper } from './TopicsPrismaMapper';
import { TopicsWithAuthorMapper } from './TopicsWithAuthorPrismaMapper';
export class TopicsPrismaRepository {
    async create(topic) {
        await prisma.topic.create({
            data: TopicsPrismaMapper.toPrisma(topic),
        });
    }
    async findById(id) {
        const topic = await prisma.topic.findUnique({
            where: {
                id,
            },
        });
        if (!topic) {
            return null;
        }
        return TopicsPrismaMapper.toEntity(topic);
    }
    async delete(id) {
        await prisma.topic.delete({
            where: {
                id,
            },
        });
    }
    async save(topic) {
        await prisma.topic.update({
            where: {
                id: topic.id.toString(),
            },
            data: TopicsPrismaMapper.toPrisma(topic),
        });
    }
    async findManyRecentWithAuthor({ page, perPage, }) {
        const topics = await prisma.topic.findMany({
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
        return topics.map(TopicsWithAuthorMapper.toTopicWithAuthor);
    }
}
//# sourceMappingURL=TopicsPrismaRepository.js.map