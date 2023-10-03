import { Notification } from '@module/notifications/entities/Notification';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class NotificationsPrismaMapper {
    static toEntity(raw) {
        return Notification.create({
            content: raw.content,
            title: raw.title,
            createdAt: raw.createdAt,
            readAt: raw.readAt,
            recipientId: new UniqueId(raw.recipientId),
        }, new UniqueId(raw.id));
    }
    static toPrisma(notification) {
        return {
            content: notification.content,
            title: notification.title,
            createdAt: notification.createdAt,
            id: notification.id.toString(),
            recipientId: notification.recipientId.toString(),
            readAt: notification.readAt,
        };
    }
}
//# sourceMappingURL=notificationsPrismaMapper.js.map