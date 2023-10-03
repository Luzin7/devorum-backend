import { Notification } from '@module/notifications/entities/Notification';
import { Notification as NotificationPrisma, Prisma } from '@prisma/client';
export declare class NotificationsPrismaMapper {
    static toEntity(raw: NotificationPrisma): Notification;
    static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput;
}
