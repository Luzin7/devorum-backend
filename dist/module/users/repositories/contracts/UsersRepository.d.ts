import { User } from '@module/users/entities/User';
import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
export declare abstract class UsersRepository {
    abstract create(user: User): Promise<void>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByIdWithNotifications(id: string): Promise<UserWithNotifications | null>;
    abstract delete(id: string): Promise<void>;
}
