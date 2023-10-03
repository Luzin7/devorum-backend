import { Topic } from '@module/topics/entities/Topic';
import { Topic as TopicPrisma, Prisma } from '@prisma/client';
export declare class TopicsPrismaMapper {
    static toEntity(raw: TopicPrisma): Topic;
    static toPrisma(topic: Topic): Prisma.TopicUncheckedCreateInput;
}
