import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    page?: number;
    perPage?: number;
}
type Response = Either<null, {
    topics: TopicWithAuthor[];
}>;
export declare class FetchRecentTopicsUseCase implements UseCase<Request, Response> {
    private readonly topicsRepository;
    constructor(topicsRepository: TopicsRepository);
    execute({ page, perPage }: Request): Promise<Response>;
}
export {};
