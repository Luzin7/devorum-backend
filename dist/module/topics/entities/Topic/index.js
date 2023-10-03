"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const AggregateRoot_1 = require("@shared/core/entities/AggregateRoot");
const TopicCommentsList_1 = require("../TopicCommentsList");
class Topic extends AggregateRoot_1.AggregateRoot {
    static create(props, id) {
        const topicProps = {
            authorId: props.authorId,
            createdAt: props.createdAt ?? new Date(),
            title: props.title,
            content: props.content,
            updatedAt: props.updatedAt ?? null,
            comments: props.comments ?? new TopicCommentsList_1.TopicCommentsList(),
        };
        const topic = new Topic(topicProps, id);
        return topic;
    }
    get authorId() {
        return this.props.authorId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get title() {
        return this.props.title;
    }
    get content() {
        return this.props.content;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get comments() {
        return this.props.comments;
    }
}
exports.Topic = Topic;
//# sourceMappingURL=index.js.map