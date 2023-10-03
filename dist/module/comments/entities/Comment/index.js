import { CommentCreatedEvent } from '@module/comments/events/CommentCreatedEvent';
import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
export class Comment extends AggregateRoot {
    static create(props, id) {
        const commentProps = {
            topicId: props.topicId,
            authorId: props.authorId,
            content: props.content,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? null,
        };
        const comment = new Comment(commentProps, id);
        const isNewComment = !id;
        if (isNewComment) {
            comment.addDomainEvent(new CommentCreatedEvent(comment));
        }
        return comment;
    }
    get topicId() {
        return this.props.topicId;
    }
    get authorId() {
        return this.props.authorId;
    }
    get content() {
        return this.props.content;
    }
    set content(content) {
        if (!content) {
            return;
        }
        this.props.content = content;
        this.update();
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    update() {
        this.props.updatedAt = new Date();
    }
}
//# sourceMappingURL=index.js.map