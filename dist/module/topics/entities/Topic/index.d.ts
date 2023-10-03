import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueId } from '@shared/core/entities/UniqueId';
import { Optional } from '@shared/core/types/optional';
import { TopicCommentsList } from '../TopicCommentsList';
export interface TopicProps {
    authorId: UniqueId;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    comments: TopicCommentsList;
}
export declare class Topic extends AggregateRoot<TopicProps> {
    static create(props: Optional<TopicProps, 'updatedAt' | 'createdAt' | 'comments'>, id?: UniqueId): Topic;
    get authorId(): UniqueId;
    get createdAt(): Date;
    get title(): string;
    get content(): string;
    get updatedAt(): Date | null;
    get comments(): TopicCommentsList;
}
