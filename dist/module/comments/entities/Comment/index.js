"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const CommentCreatedEvent_1 = require("@module/comments/events/CommentCreatedEvent");
const AggregateRoot_1 = require("@shared/core/entities/AggregateRoot");
class Comment extends AggregateRoot_1.AggregateRoot {
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
            comment.addDomainEvent(new CommentCreatedEvent_1.CommentCreatedEvent(comment));
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
exports.Comment = Comment;
//# sourceMappingURL=index.js.map