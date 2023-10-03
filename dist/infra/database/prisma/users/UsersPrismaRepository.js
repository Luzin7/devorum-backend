import { prisma } from '@infra/database/createConnection';
import { UsersPrismaMapper } from './UsersPrismaMapper';
import { UsersWithNotificationsPrismaMapper } from './UsersWithNotificationsPrismaMapper';
export class UsersPrismaRepository {
    async create(user) {
        await prisma.user.create({
            data: UsersPrismaMapper.toPrisma(user),
        });
    }
    async findById(id) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return null;
        }
        return UsersPrismaMapper.toEntity(user);
    }
    async findByIdWithNotifications(id) {
        const user = await prisma.user.findUnique({
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
        return UsersWithNotificationsPrismaMapper.toEntity(user);
    }
    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        return UsersPrismaMapper.toEntity(user);
    }
    async delete(id) {
        await prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
//# sourceMappingURL=UsersPrismaRepository.js.map