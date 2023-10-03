import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { Optional } from '@shared/core/types/optional';
export interface CommentProps {
    topicId: UniqueId;
    authorId: UniqueId;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
}
export declare class Comment extends AggregateRoot<CommentProps> {
    static create(props: Optional<CommentProps, 'createdAt' | 'updatedAt'>, id?: UniqueId): Comment;
    get topicId(): UniqueId;
    get authorId(): UniqueId;
    get content(): string;
    set content(content: string);
    get createdAt(): Date;
    get updatedAt(): Date | null;
    update(): void;
}
