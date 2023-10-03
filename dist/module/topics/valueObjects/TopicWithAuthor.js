import { ValueObject } from '@shared/core/entities/ValueObject';
export class TopicWithAuthor extends ValueObject {
    static create(props) {
        return new TopicWithAuthor({
            ...props,
            numberOfComments: props.numberOfComments ?? 0,
        });
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
    get topicCreatedAt() {
        return this.props.topicCreatedAt;
    }
    get topicUpdatedAt() {
        return this.props.topicUpdatedAt;
    }
    get authorName() {
        return this.props.authorName;
    }
    get numberOfComments() {
        return this.props.numberOfComments;
    }
}
//# sourceMappingURL=TopicWithAuthor.js.map