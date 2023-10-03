import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { TopicCommentsList } from '../TopicCommentsList';
export class Topic extends AggregateRoot {
    static create(props, id) {
        const topicProps = {
            authorId: props.authorId,
            createdAt: props.createdAt ?? new Date(),
            title: props.title,
            content: props.content,
            updatedAt: props.updatedAt ?? null,
            comments: props.comments ?? new TopicCommentsList(),
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
//# sourceMappingURL=index.js.map