import 'reflect-metadata'
import { SendNotificationUseCase } from '.'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'

let notificationsRepository: NotificationsInMemoryRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()

    sut = new SendNotificationUseCase(notificationsRepository)
  })

  it('should be able to send an new notification', async () => {
    const response = await sut.execute({
      content: 'content',
      recipientId: 'user-id',
      title: 'new notification',
    })

    expect(response.isRight()).toEqual(true)
    expect(notificationsRepository.notifications[0].content).toEqual('content')
  })
})
