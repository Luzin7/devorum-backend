"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersInMemoryRepository = void 0;
const UserWithNotifications_1 = require("@module/users/valueObjects/UserWithNotifications");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class UsersInMemoryRepository {
    constructor(notificationsRepository) {
        this.notificationsRepository = notificationsRepository;
        this.users = [];
    }
    async create(user) {
        this.users.push(user);
    }
    async findById(id) {
        const user = this.users.find((user) => user.id.equals(new UniqueId_1.UniqueId(id)));
        return user ?? null;
    }
    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user ?? null;
    }
    async delete(id) {
        this.users = this.users.filter((user) => !user.id.equals(new UniqueId_1.UniqueId(id)));
    }
    async findByIdWithNotifications(id) {
        const user = this.users.find((u) => u.id.toString() === id);
        if (!user) {
            return null;
        }
        const notificationsOfUser = this.notificationsRepository.notifications.filter((notification) => notification.recipientId.equals(user.id));
        return UserWithNotifications_1.UserWithNotifications.create({
            email: user.email,
            name: user.name,
            notifications: notificationsOfUser,
            userId: user.id,
        });
    }
}
exports.UsersInMemoryRepository = UsersInMemoryRepository;
//# sourceMappingURL=UsersInMemoryRepository.js.map