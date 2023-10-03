"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const AggregateRoot_1 = require("@shared/core/entities/AggregateRoot");
class Notification extends AggregateRoot_1.AggregateRoot {
    static create(props, id) {
        const notificationProps = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            readAt: props.readAt ?? null,
        };
        const notification = new Notification(notificationProps, id);
        return notification;
    }
    get title() {
        return this.props.title;
    }
    get content() {
        return this.props.content;
    }
    get recipientId() {
        return this.props.recipientId;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get readAt() {
        return this.props.readAt;
    }
    read() {
        this.props.readAt = new Date();
    }
}
exports.Notification = Notification;
//# sourceMappingURL=index.js.map