import { prisma } from '@infra/database/createConnection'
import { User } from '@module/users/entities/User'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { UsersPrismaMapper } from './UsersPrismaMapper'

export class UsersPrismaRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: UsersPrismaMapper.toPrisma(user),
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return UsersPrismaMapper.toEntity(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return UsersPrismaMapper.toEntity(user)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
