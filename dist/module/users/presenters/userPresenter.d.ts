import { User } from '../entities/User';
export declare class UserPresenter {
    static toHTTP(user: User): {
        id: string;
        name: string;
        email: string;
    };
}
