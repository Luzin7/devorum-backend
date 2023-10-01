import { Injectable } from '@infra/containers/Injectable'
import { Notification } from '@module/notifications/entities/Notification'
import { NotificationNotFoundError } from '@module/notifications/errors/NotificationNotFoundError'
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository'
import { Either, left, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { inject, injectable } from 'tsyringe'

interface Request {
  recipientId: string
  notificationId: string
}

type Response = Either<
  NotificationNotFoundError | PermissionDeniedError,
  { notification: Notification }
>

@injectable()
export class ReadNotificationUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Notifications)
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  async execute({ recipientId, notificationId }: Request): Promise<Response> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new NotificationNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new PermissionDeniedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({
      notification,
    })
  }
}
