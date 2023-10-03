import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
export class Notification extends AggregateRoot {
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
//# sourceMappingURL=index.js.map