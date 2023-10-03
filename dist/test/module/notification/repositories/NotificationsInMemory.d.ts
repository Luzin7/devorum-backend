import { Notification } from '@module/notifications/entities/Notification';
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository';
export declare class NotificationsInMemoryRepository implements NotificationsRepository {
    notifications: Notification[];
    create(notification: Notification): Promise<void>;
    findById(id: string): Promise<Notification | null>;
    save(notification: Notification): Promise<void>;
}
