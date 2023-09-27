import { User } from '@module/users/entities/User'
import { User as UserPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class UsersPrismaMapper {
  static toEntity(raw: UserPrisma): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        salt: raw.salt,
        createdAt: raw.createdAt,
      },
      new UniqueId(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      salt: user.salt,
      createdAt: user.createdAt,
      id: user.id.toString(),
    }
  }
}
