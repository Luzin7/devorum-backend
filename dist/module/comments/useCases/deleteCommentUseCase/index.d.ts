import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
interface Request {
    topicId: string;
    commentId: string;
    authorId: string;
}
type Response = Either<UserNotFoundError | TopicNotFoundError | PermissionDeniedError | CommentNotFoundError, null>;
export declare class DeleteCommentUseCase implements UseCase<Request, Response> {
    private readonly topicsRepository;
    private readonly commentsRepository;
    private readonly usersRepository;
    constructor(topicsRepository: TopicsRepository, commentsRepository: CommentsRepository, usersRepository: UsersRepository);
    execute({ topicId, authorId, commentId }: Request): Promise<Response>;
}
export {};
