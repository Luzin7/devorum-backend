import { Comment, CommentProps } from '@module/comments/entities/Comment';
import { UniqueId } from '@shared/core/entities/UniqueId';
export declare function makeComment(override?: Partial<CommentProps>, id?: UniqueId): Comment;
