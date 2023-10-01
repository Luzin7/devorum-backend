import 'reflect-metadata'
import { makeComment } from '@test/module/comment/factories/makeComment'
import { OnCommentCreated } from '.'
import { CommentsInMemoryRepository } from '@test/module/comment/repositories/CommentsInMemoryRepository'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { SendNotificationUseCase } from '@module/notifications/useCases/sendNotificationUseCase'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { SpyInstance } from 'vitest'
import { waitFor } from '@test/utils/waitFor'

let usersRepository: UsersInMemoryRepository
let topicsRepository: TopicsInMemoryRepository
let commentsRepository: CommentsInMemoryRepository
let notificationsRepository: NotificationsInMemoryRepository

let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance

describe('On comment created', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository(notificationsRepository)
    commentsRepository = new CommentsInMemoryRepository()
    topicsRepository = new TopicsInMemoryRepository(usersRepository)
    notificationsRepository = new NotificationsInMemoryRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnCommentCreated(topicsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an comment is created', async () => {
    const topic = makeTopic()
    const comment = makeComment({
      topicId: topic.id,
    })

    topicsRepository.create(topic)
    commentsRepository.create(comment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
