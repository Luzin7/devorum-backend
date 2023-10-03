import { Topic } from '@module/topics/entities/Topic';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    content: string;
    authorId: string;
    title: string;
}
type Response = Either<UserNotFoundError, {
    topic: Topic;
}>;
export declare class CreateTopicUseCase implements UseCase<Request, Response> {
    private readonly topicsRepository;
    private readonly usersRepository;
    constructor(topicsRepository: TopicsRepository, usersRepository: UsersRepository);
    execute({ content, authorId, title }: Request): Promise<Response>;
}
export {};
