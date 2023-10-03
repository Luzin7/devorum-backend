"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPrismaMapper = void 0;
const User_1 = require("@module/users/entities/User");
const UniqueId_1 = require("@shared/core/entities/UniqueId");
class UsersPrismaMapper {
    static toEntity(raw) {
        return User_1.User.create({
            email: raw.email,
            name: raw.name,
            password: raw.password,
            salt: raw.salt,
            createdAt: raw.createdAt,
        }, new UniqueId_1.UniqueId(raw.id));
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
exports.UsersPrismaMapper = UsersPrismaMapper;
//# sourceMappingURL=UsersPrismaMapper.js.map