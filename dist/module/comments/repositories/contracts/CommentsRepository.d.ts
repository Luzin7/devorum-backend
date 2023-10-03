import { Comment } from '@module/comments/entities/Comment';
export declare abstract class CommentsRepository {
    abstract create(comment: Comment): Promise<void>;
    abstract findById(id: string): Promise<Comment | null>;
    abstract delete(id: string): Promise<void>;
    abstract save(comment: Comment): Promise<void>;
}
