"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPresenter = void 0;
class NotificationPresenter {
    static toHTTP(notification) {
        return {
            title: notification.title,
            content: notification.content,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        };
    }
}
exports.NotificationPresenter = NotificationPresenter;
//# sourceMappingURL=notificationPresenter.js.map