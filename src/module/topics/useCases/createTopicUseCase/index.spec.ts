import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { CreateTopicUseCase } from '.'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'

let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: CreateTopicUseCase

describe('create topic', () => {
  beforeEach(() => {
    topicsRepository = new TopicsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()

    sut = new CreateTopicUseCase(topicsRepository, usersRepository)
  })

  it('should be able to create an new topic', async () => {
    const user = makeUser({}, new UniqueId('user-1'))

    usersRepository.create(user)

    const response = await sut.execute({
      content: 'content',
      authorId: 'user-1',
      title: 'title',
    })

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics[0].content).toEqual('content')
    expect(topicsRepository.topics[0].authorId.toString()).toEqual('user-1')
  })

  it('not should be able to create an new topic if user doesnt exists', async () => {
    const response = await sut.execute({
      content: 'content',
      authorId: 'non-existent-user-id',
      title: 'title',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserNotFoundError)
  })
})
