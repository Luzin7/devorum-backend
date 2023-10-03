import { UserWithNotifications } from '../valueObjects/UserWithNotifications';
export declare class UserWithNotificationsPresenter {
    static toHTTP(userWhitNotifications: UserWithNotifications): {
        userId: string;
        name: string;
        email: string;
        notifications: {
            title: string;
            content: string;
            readAt: Date | null;
            createdAt: Date;
        }[];
    };
}
