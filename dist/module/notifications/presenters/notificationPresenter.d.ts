import { Notification } from '../entities/Notification';
export declare class NotificationPresenter {
    static toHTTP(notification: Notification): {
        title: string;
        content: string;
        readAt: Date | null;
        createdAt: Date;
    };
}
