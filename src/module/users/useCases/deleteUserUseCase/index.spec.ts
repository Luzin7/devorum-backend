import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { DeleteUserUseCase } from '.'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'

let usersRepository: UsersInMemoryRepository
let sut: DeleteUserUseCase

describe('delete user', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()

    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be able to delete an user', async () => {
    const user = makeUser({}, new UniqueId('1'))
    usersRepository.create(user)

    const response = await sut.execute({
      id: '1',
    })

    expect(response.isRight()).toEqual(true)
    expect(usersRepository.users.length).toEqual(0)
  })

  it('not should be able to delete an unixistent user', async () => {
    const response = await sut.execute({
      id: 'unixistent-id',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserNotFoundError)
  })
})
