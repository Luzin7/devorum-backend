import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { UpdateTopicUseCase } from '.'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'
import { TextImplementedProvider } from '@providers/text/implementations/TextImplementedProvider'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'

let notificationsRepository: NotificationsInMemoryRepository
let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let textImplementedProvider: TextImplementedProvider

let sut: UpdateTopicUseCase

describe('update topic', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository(notificationsRepository)
    topicsRepository = new TopicsInMemoryRepository(usersRepository)
    textImplementedProvider = new TextImplementedProvider()

    sut = new UpdateTopicUseCase(
      topicsRepository,
      usersRepository,
      textImplementedProvider,
    )
  })

  it('should be able to update a topic', async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    usersRepository.create(user)
    topicsRepository.create(topic)

    const response = await sut.execute({
      content: 'content',
      authorId: user.id.toString(),
      topicId: topic.id.toString(),
      title: 'title',
    })

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics[0].content).toEqual('content')
    expect(topicsRepository.topics[0].title).toEqual('title')
    expect(topicsRepository.topics[0].updatedAt).toBeInstanceOf(Date)
  })

  it('not should be able to update a topic if topic doesnt exists', async () => {
    const user = makeUser()

    usersRepository.create(user)

    const response = await sut.execute({
      content: 'content',
      authorId: user.id.toString(),
      topicId: 'non-existent-user-id',
      title: 'title',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(TopicNotFoundError)
  })
})
