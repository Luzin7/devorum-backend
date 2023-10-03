import { Topic } from '@module/topics/entities/Topic';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { FindManyRecentProps } from '@module/topics/repositories/types/FindManyRecent';
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
export declare class TopicsPrismaRepository implements TopicsRepository {
    create(topic: Topic): Promise<void>;
    findById(id: string): Promise<Topic | null>;
    delete(id: string): Promise<void>;
    save(topic: Topic): Promise<void>;
    findManyRecentWithAuthor({ page, perPage, }: FindManyRecentProps): Promise<TopicWithAuthor[]>;
}
