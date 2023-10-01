import { UniqueId } from '@shared/core/entities/UniqueId'
import { User } from '.'

describe('instance user', () => {
  it('should instance a new user', () => {
    const user = User.create({
      email: 'email@email.email',
      name: 'John',
      password: 'password',
      salt: 'salt',
    })
    expect(user.id).toBeInstanceOf(UniqueId)
    expect(user.createdAt).toBeInstanceOf(Date)
  })
})
