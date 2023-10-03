"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsInMemoryRepository = void 0;
class NotificationsInMemoryRepository {
    constructor() {
        this.notifications = [];
    }
    async create(notification) {
        this.notifications.push(notification);
    }
    async findById(id) {
        const notification = this.notifications.find((notification) => notification.id.toString() === id);
        if (!notification)
            return null;
        return notification;
    }
    async save(notification) {
        const notificationIndex = this.notifications.findIndex((n) => n.id.equals(notification.id));
        if (notificationIndex < 0) {
            throw new Error('Notification not created');
        }
        this.notifications[notificationIndex] = notification;
    }
}
exports.NotificationsInMemoryRepository = NotificationsInMemoryRepository;
//# sourceMappingURL=NotificationsInMemory.js.map