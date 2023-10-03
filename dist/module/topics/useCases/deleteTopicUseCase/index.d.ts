import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
interface Request {
    topicId: string;
    authorId: string;
}
type Response = Either<UserNotFoundError | TopicNotFoundError | PermissionDeniedError, null>;
export declare class DeleteTopicUseCase implements UseCase<Request, Response> {
    private readonly topicsRepository;
    private readonly usersRepository;
    constructor(topicsRepository: TopicsRepository, usersRepository: UsersRepository);
    execute({ topicId, authorId }: Request): Promise<Response>;
}
export {};
