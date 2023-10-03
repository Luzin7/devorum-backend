"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPrismaRepository = void 0;
const createConnection_1 = require("@infra/database/createConnection");
const UsersPrismaMapper_1 = require("./UsersPrismaMapper");
const UsersWithNotificationsPrismaMapper_1 = require("./UsersWithNotificationsPrismaMapper");
class UsersPrismaRepository {
    async create(user) {
        await createConnection_1.prisma.user.create({
            data: UsersPrismaMapper_1.UsersPrismaMapper.toPrisma(user),
        });
    }
    async findById(id) {
        const user = await createConnection_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return null;
        }
        return UsersPrismaMapper_1.UsersPrismaMapper.toEntity(user);
    }
    async findByIdWithNotifications(id) {
        const user = await createConnection_1.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                notifications: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 50,
                },
            },
        });
        if (!user)
            return null;
        return UsersWithNotificationsPrismaMapper_1.UsersWithNotificationsPrismaMapper.toEntity(user);
    }
    async findByEmail(email) {
        const user = await createConnection_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        return UsersPrismaMapper_1.UsersPrismaMapper.toEntity(user);
    }
    async delete(id) {
        await createConnection_1.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
exports.UsersPrismaRepository = UsersPrismaRepository;
//# sourceMappingURL=UsersPrismaRepository.js.map