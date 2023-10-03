import { Comment } from '@module/comments/entities/Comment';
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository';
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
interface Request {
    content: string;
    authorId: string;
    topicId: string;
}
type Response = Either<CommentNotFoundError | UserNotFoundError, {
    comment: Comment;
}>;
export declare class CreateCommentUseCase implements UseCase<Request, Response> {
    private readonly topicsRepository;
    private readonly commentsRepository;
    private readonly usersRepository;
    constructor(topicsRepository: TopicsRepository, commentsRepository: CommentsRepository, usersRepository: UsersRepository);
    execute({ content, authorId, topicId }: Request): Promise<Response>;
}
export {};
