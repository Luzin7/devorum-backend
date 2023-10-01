import { Injectable } from '@infra/containers/Injectable'
import { Notification } from '@module/notifications/entities/Notification'
import { NotificationsRepository } from '@module/notifications/repositories/contracts/NotificationsRepository'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { Either, right } from '@shared/core/errors/Either'
import { UseCase } from '@shared/core/module/UseCase'
import { inject, injectable } from 'tsyringe'

interface Request {
  title: string
  content: string
  recipientId: string
}

type Response = Either<null, { notification: Notification }>

@injectable()
export class SendNotificationUseCase implements UseCase<Request, Response> {
  constructor(
    @inject(Injectable.Repositories.Notifications)
    private readonly notificationRepository: NotificationsRepository,
  ) {}

  async execute({ content, recipientId, title }: Request): Promise<Response> {
    const notification = Notification.create({
      content,
      recipientId: new UniqueId(recipientId),
      title,
    })

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
