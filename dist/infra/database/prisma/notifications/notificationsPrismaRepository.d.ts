import { Notification } from '@module/notifications/entities/Notification';
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository';
export declare class NotificationsPrismaRepository implements NotificationsRepository {
    create(notification: Notification): Promise<void>;
    findById(id: string): Promise<Notification | null>;
    save(notification: Notification): Promise<void>;
}
