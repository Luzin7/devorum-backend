import { User } from '@module/users/entities/User';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
export declare class UsersPrismaRepository implements UsersRepository {
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByIdWithNotifications(id: string): Promise<UserWithNotifications | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}
