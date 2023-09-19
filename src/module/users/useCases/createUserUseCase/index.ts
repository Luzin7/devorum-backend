import { User } from '@module/users/entities/User'
import { UserAlreadyExitesError } from '@module/users/errors/UserAlreadyExitesError'
import { UsersRepository } from '@module/users/repositories/contracts/UsersRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { pbkdf2Sync, randomBytes } from 'crypto'

function encryptPassword(password: string, salt: string): string {
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
  return hash
}

interface Request {
  name: string
  password: string
  email: string
}

type Response = Either<
  UserAlreadyExitesError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, name, password }: Request): Promise<Response> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExitesError())
    }

    const salt = randomBytes(16).toString('hex')
    const encryptedPassword = encryptPassword(password, salt)

    const user = User.create({
      email,
      name,
      password: encryptedPassword,
      salt,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
