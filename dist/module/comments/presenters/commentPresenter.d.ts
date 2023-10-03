import { Comment } from '../entities/Comment';
export declare class CommentPresenter {
    static toHTTP(comment: Comment): {
        id: string;
        content: string;
        updatedAt: Date | null;
        createdAt: Date;
        authorId: string;
        topicId: string;
    };
}
