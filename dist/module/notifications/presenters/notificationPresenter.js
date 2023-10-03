export class NotificationPresenter {
    static toHTTP(notification) {
        return {
            title: notification.title,
            content: notification.content,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        };
    }
}
//# sourceMappingURL=notificationPresenter.js.map