import 'reflect-metadata'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { FetchRecentTopicsUseCase } from '.'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'
import { TextImplementedProvider } from '@providers/text/implementations/TextImplementedProvider'

let notificationsRepository: NotificationsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let topicsRepository: TopicsInMemoryRepository
let textProvider: TextImplementedProvider
let sut: FetchRecentTopicsUseCase

describe('Fetch recent topics', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository(notificationsRepository)
    topicsRepository = new TopicsInMemoryRepository(usersRepository)
    textProvider = new TextImplementedProvider()

    sut = new FetchRecentTopicsUseCase(topicsRepository, textProvider)
  })

  it('should be able to fetch a recent topics', async () => {
    const user = makeUser()
    usersRepository.create(user)

    for (let i = 0; i < 30; i++) {
      const topic = makeTopic({
        authorId: user.id,
      })
      topicsRepository.create(topic)
    }

    const response = await sut.execute({})

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics).toHaveLength(30)

    if (response.isRight()) {
      expect(response.value.topics).toHaveLength(20)
      expect(response.value.topics[0].authorName).toEqual(user.name)
    }
  })

  it('should be able to fetch a recent topics whit 10 per page', async () => {
    const user = makeUser()
    usersRepository.create(user)

    for (let i = 0; i < 30; i++) {
      const topic = makeTopic({
        authorId: user.id,
      })
      topicsRepository.create(topic)
    }

    const response = await sut.execute({
      perPage: 10,
    })

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics).toHaveLength(30)

    if (response.isRight()) {
      expect(response.value.topics).toHaveLength(10)
      expect(response.value.topics[0].authorName).toEqual(user.name)
    }
  })

  it('should be able to fetch a recent topics on different page', async () => {
    const user = makeUser()
    usersRepository.create(user)

    for (let i = 0; i < 30; i++) {
      const topic = makeTopic({
        authorId: user.id,
      })
      topicsRepository.create(topic)
    }

    const response = await sut.execute({
      page: 2,
    })

    expect(response.isRight()).toEqual(true)
    expect(topicsRepository.topics).toHaveLength(30)

    if (response.isRight()) {
      expect(response.value.topics).toHaveLength(10)
      expect(response.value.topics[0].authorName).toEqual(user.name)
    }
  })
})
