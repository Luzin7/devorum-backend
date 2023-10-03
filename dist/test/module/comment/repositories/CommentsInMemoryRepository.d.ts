import { Comment } from '@module/comments/entities/Comment';
import { CommentsRepository } from '@module/comments/repositories/contracts/CommentsRepository';
export declare class CommentsInMemoryRepository extends CommentsRepository {
    comments: Comment[];
    save(comment: Comment): Promise<void>;
    create(comment: Comment): Promise<void>;
    findById(id: string): Promise<Comment | null>;
    delete(id: string): Promise<void>;
}
