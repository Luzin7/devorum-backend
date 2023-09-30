import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { FakeCryptographyProvider } from '@test/providers/cryptography/fakeCryptographyProvider'
import { CreateSessionUseCase } from '.'
import { FakeAuthProvider } from '@test/providers/auth/fakeAuthProvider'
import { WrongCredentialsError } from '@module/users/errors/WrongCredentialsError'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'

let notificationsRepository: NotificationsInMemoryRepository
let usersRepository: UsersInMemoryRepository

let cryptographyProvider: FakeCryptographyProvider

let authProvider: FakeAuthProvider
let sut: CreateSessionUseCase

describe('create session', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository(notificationsRepository)

    cryptographyProvider = new FakeCryptographyProvider()
    authProvider = new FakeAuthProvider()

    sut = new CreateSessionUseCase(
      cryptographyProvider,
      usersRepository,
      authProvider,
    )
  })

  it('should be able to create an new session for user', async () => {
    const { hash, salt } = await cryptographyProvider.hashCreator('12345678')

    const user = makeUser({
      password: hash,
      salt,
      email: 'test@test.com',
    })

    await usersRepository.create(user)

    const response = await sut.execute({
      email: 'test@test.com',
      password: '12345678',
    })

    expect(response.isRight()).toEqual(true)
    expect(usersRepository.users[0].password).not.equal('password')

    if (response.isRight()) {
      expect(response.value.accessToken).toEqual(`${user.id.toString()}-access`)
    }
  })

  it('not should be able to create an new session for user if pass is wrong', async () => {
    const { hash, salt } = await cryptographyProvider.hashCreator('12345678')

    const user = makeUser({
      password: hash,
      salt,
      email: 'test@test.com',
    })

    await usersRepository.create(user)

    const response = await sut.execute({
      email: 'test@test.com',
      password: 'wrong-password',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('not should be able to create an new session for user if user not exist', async () => {
    const response = await sut.execute({
      email: 'unixistent@user.com',
      password: '12345678',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(WrongCredentialsError)
  })
})
