import { User } from '@module/users/entities/User';
import { UniqueId } from '@shared/core/entities/UniqueId';
export class UsersPrismaMapper {
    static toEntity(raw) {
        return User.create({
            email: raw.email,
            name: raw.name,
            password: raw.password,
            salt: raw.salt,
            createdAt: raw.createdAt,
        }, new UniqueId(raw.id));
    }
    static toPrisma(user) {
        return {
            email: user.email,
            name: user.name,
            password: user.password,
            salt: user.salt,
            createdAt: user.createdAt,
            id: user.id.toString(),
        };
    }
}
//# sourceMappingURL=UsersPrismaMapper.js.map