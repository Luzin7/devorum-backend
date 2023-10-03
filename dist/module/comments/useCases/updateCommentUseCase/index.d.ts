import { Comment } from '@module/comments/entities/Comment';
import { CommentNotCanBeUpdatedError } from '@module/comments/errors/CommentNotCanBeUpdatedError';
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError';
import { Either } from '@shared/core/errors/Either';
import { UseCase } from '@shared/core/module/UseCase';
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError';
interface Request {
    commentId: string;
    authorId: string;
    content?: string;
}
type Response = Either<PermissionDeniedError | TopicNotFoundError | CommentNotFoundError | CommentNotCanBeUpdatedError, {
    comment: Comment;
}>;
export declare class UpdateCommentUseCase implements UseCase<Request, Response> {
    private readonly commentsRepository;
    constructor(commentsRepository: CommentsRepository);
    execute({ authorId, commentId, content }: Request): Promise<Response>;
}
export {};
