import { UniqueId } from '@shared/core/entities/UniqueId'
import { DomainEvent } from '@shared/core/events/DomainEvent'
import { Comment } from '../entities/Comment'

export class CommentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  private _comment: Comment

  constructor(comment: Comment) {
    this._comment = comment
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueId {
    return this._comment.id
  }

  get comment() {
    return this._comment
  }
}
