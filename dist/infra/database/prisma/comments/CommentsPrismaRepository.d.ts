import { Comment } from '@module/comments/entities/Comment';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
export declare class CommentsPrismaRepository implements CommentsRepository {
    create(comment: Comment): Promise<void>;
    findById(id: string): Promise<Comment | null>;
    delete(id: string): Promise<void>;
    save(comment: Comment): Promise<void>;
}
