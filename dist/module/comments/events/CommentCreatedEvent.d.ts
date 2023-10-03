import { UniqueId } from '@shared/core/entities/UniqueId';
import { DomainEvent } from '@shared/core/events/DomainEvent';
import { Comment } from '../entities/Comment';
export declare class CommentCreatedEvent implements DomainEvent {
    ocurredAt: Date;
    private _comment;
    constructor(comment: Comment);
    getAggregateId(): UniqueId;
    get comment(): Comment;
}
