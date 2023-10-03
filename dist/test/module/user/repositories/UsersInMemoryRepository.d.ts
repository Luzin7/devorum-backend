import { User } from '@module/users/entities/User';
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository';
import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory';
export declare class UsersInMemoryRepository implements UsersRepository {
    private readonly notificationsRepository;
    constructor(notificationsRepository: NotificationsInMemoryRepository);
    users: User[];
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    findByIdWithNotifications(id: string): Promise<UserWithNotifications | null>;
}
