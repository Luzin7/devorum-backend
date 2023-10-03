"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicWithAuthor = void 0;
const ValueObject_1 = require("@shared/core/entities/ValueObject");
class TopicWithAuthor extends ValueObject_1.ValueObject {
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
exports.TopicWithAuthor = TopicWithAuthor;
//# sourceMappingURL=TopicWithAuthor.js.map