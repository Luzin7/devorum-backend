import { UniqueId } from '@shared/core/entities/UniqueId';
import { ValueObject } from '@shared/core/entities/ValueObject';
import { Optional } from '@shared/core/types/optional';
interface TopicWithAuthorProps {
    topicId: UniqueId;
    authorId: UniqueId;
    authorName: string;
    content: string;
    topicCreatedAt: Date;
    topicUpdatedAt: Date | null;
    numberOfComments: number;
}
export declare class TopicWithAuthor extends ValueObject<TopicWithAuthorProps> {
    static create(props: Optional<TopicWithAuthorProps, 'numberOfComments'>): TopicWithAuthor;
    get topicId(): UniqueId;
    get authorId(): UniqueId;
    get content(): string;
    get topicCreatedAt(): Date;
    get topicUpdatedAt(): Date | null;
    get authorName(): string;
    get numberOfComments(): number;
}
export {};
