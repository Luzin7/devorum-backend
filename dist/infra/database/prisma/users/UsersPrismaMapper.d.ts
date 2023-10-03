import { User } from '@module/users/entities/User';
import { User as UserPrisma, Prisma } from '@prisma/client';
export declare class UsersPrismaMapper {
    static toEntity(raw: UserPrisma): User;
    static toPrisma(user: User): Prisma.UserUncheckedCreateInput;
}
