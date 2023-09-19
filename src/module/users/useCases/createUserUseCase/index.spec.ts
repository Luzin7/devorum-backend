import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UserAlreadyExitesError } from '@module/users/errors/UserAlreadyExitesError'
import { CreateUserUseCase } from '.'

let usersRepository: UsersInMemoryRepository
let sut: CreateUserUseCase

describe('create user', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()

    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an new user', async () => {
    const response = await sut.execute({
      email: 'jonh@doe.com',
      name: 'jao doe',
      password: 'password',
    })

    expect(response.isRight()).toEqual(true)
    expect(usersRepository.users[0].password).not.equal('password')
  })

  it('not should be able to create an new user if user already registered with same email', async () => {
    const user = makeUser({
      email: 'jonh@doe.com',
    })

    usersRepository.create(user)

    const response = await sut.execute({
      email: 'jonh@doe.com',
      name: 'jao doe',
      password: 'password',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserAlreadyExitesError)
  })
})
