import 'reflect-metadata'
import { ReadNotificationUseCase } from '.'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { NotificationNotFoundError } from '@module/notifications/errors/NotificationNotFoundError'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { makeNotification } from '@test/module/notification/factories/makeNotification'

let notificationsRepository: NotificationsInMemoryRepository
let sut: ReadNotificationUseCase

describe('read Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()

    sut = new ReadNotificationUseCase(notificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification({
      recipientId: new UniqueId('user-id'),
    })
    notificationsRepository.create(notification)

    const response = await sut.execute({
      recipientId: 'user-id',
      notificationId: notification.id.toString(),
    })

    expect(response.isRight()).toEqual(true)
    expect(notificationsRepository.notifications[0].readAt).toBeInstanceOf(Date)
  })

  it('not should be able to read a unixistent notification', async () => {
    const response = await sut.execute({
      recipientId: 'user-id',
      notificationId: 'unixistent-notification-id',
    })

    expect(response.isRight()).toEqual(false)
    expect(response.value).toBeInstanceOf(NotificationNotFoundError)
  })

  it('not should be able to read a notification of another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueId('user-id-2'),
    })
    notificationsRepository.create(notification)

    const response = await sut.execute({
      recipientId: 'user-id',
      notificationId: notification.id.toString(),
    })

    expect(response.isRight()).toEqual(false)
    expect(response.value).toBeInstanceOf(PermissionDeniedError)
  })
})
