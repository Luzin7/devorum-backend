import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { MarkTopicAsDeletedUseCase } from '.'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'

let notificationsRepository: NotificationsInMemoryRepository
let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: MarkTopicAsDeletedUseCase

describe('mark topic as deleted', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository(notificationsRepository)
    topicsRepository = new TopicsInMemoryRepository(usersRepository)

    sut = new MarkTopicAsDeletedUseCase(topicsRepository, usersRepository)
  })

  it('should be able to mark topic as deleted', async () => {
    const user = makeUser({}, new UniqueId('user-1'))
    const topic = makeTopic({ authorId: user.id }, new UniqueId('topic-1'))

    usersRepository.create(user)
    topicsRepository.create(topic)

    const response = await sut.execute({
      topicId: 'topic-1',
      authorId: 'user-1',
    })

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics.length).toEqual(1)
    expect(topicsRepository.topics[0].isDeleted).toEqual(true)
  })

  it('not should be able mark to deleted a topic if user doesnt exists', async () => {
    const topic = makeTopic({}, new UniqueId('topic-1'))

    topicsRepository.create(topic)

    const response = await sut.execute({
      topicId: 'topic-1',
      authorId: 'non-existent-user-id',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserNotFoundError)
  })

  it('not should be able mark to delete a topic if it doesnt exists', async () => {
    const user = makeUser({}, new UniqueId('user-1'))

    usersRepository.create(user)

    const response = await sut.execute({
      topicId: 'non-existent-topic-id',
      authorId: 'user-1',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(TopicNotFoundError)
  })
})
