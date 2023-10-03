import { Topic } from '@module/topics/entities/Topic';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { FindManyRecentProps } from '@module/topics/repositories/types/FindManyRecent';
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository';
export declare class TopicsInMemoryRepository implements TopicsRepository {
    private readonly usersRepository;
    constructor(usersRepository: UsersInMemoryRepository);
    topics: Topic[];
    save(): Promise<void>;
    create(topic: Topic): Promise<void>;
    findById(id: string): Promise<Topic | null>;
    delete(id: string): Promise<void>;
    findManyRecentWithAuthor({ page, perPage, }: FindManyRecentProps): Promise<TopicWithAuthor[]>;
}
