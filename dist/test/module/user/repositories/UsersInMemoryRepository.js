import { UserWithNotifications } from '@module/users/valueObjects/UserWithNotifications';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class UsersInMemoryRepository {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
        this.users = [];
    }
    async create(user) {
        this.users.push(user);
    }
    async findById(id) {
        const user = this.users.find((user) => user.id.equals(new UniqueId(id)));
        return user ?? null;
    }
    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user ?? null;
    }
    async delete(id) {
        this.users = this.users.filter((user) => !user.id.equals(new UniqueId(id)));
    }
    async findByIdWithNotifications(id) {
        const user = this.users.find((u) => u.id.toString() === id);
        if (!user) {
            return null;
        }
        const notificationsOfUser = this.notificationsRepository.notifications.filter((notification) => notification.recipientId.equals(user.id));
        return UserWithNotifications.create({
            email: user.email,
            name: user.name,
            notifications: notificationsOfUser,
            userId: user.id,
        });
    }
}
//# sourceMappingURL=UsersInMemoryRepository.js.map