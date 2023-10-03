import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
import { NotificationsPrismaMapper } from '../notifications/notificationsPrismaMapper';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class UsersWithNotificationsPrismaMapper {
    static toEntity(raw) {
        return UserWithNotifications.create({
            email: raw.email,
            name: raw.name,
            notifications: raw.notifications.map(NotificationsPrismaMapper.toEntity),
            userId: new UniqueId(raw.id),
        });
    }
}
//# sourceMappingURL=UsersWithNotificationsPrismaMapper.js.map