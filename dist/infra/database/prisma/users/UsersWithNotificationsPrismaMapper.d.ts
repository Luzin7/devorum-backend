import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
import { User as UserPrisma, Notification as NotificationPrisma } from '@prisma/client';
type UserWithNotificationsPrisma = UserPrisma & {
    notifications: NotificationPrisma[];
};
export declare class UsersWithNotificationsPrismaMapper {
    static toEntity(raw: UserWithNotificationsPrisma): UserWithNotifications;
}
export {};
