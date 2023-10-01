import { fakerPT_BR } from '@faker-js/faker'
import { User, UserProps } from '@module/users/entities/User'
import { UniqueId } from '@shared/core/entities/UniqueId'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueId) {
  const user = User.create(
    {
      email: fakerPT_BR.internet.email(),
      name: fakerPT_BR.person.fullName(),
      password: fakerPT_BR.internet.password(),
      salt: fakerPT_BR.internet.ipv6(),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return user
}
