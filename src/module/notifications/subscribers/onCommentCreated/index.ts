import { Injectable } from '@infra/containers/Injectable'
import { CommentCreatedEvent } from '@module/comments/events/CommentCreatedEvent'
import { SendNotificationUseCase } from '@module/notifications/useCases/sendNotificationUseCase'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { DomainEvents } from '@shared/core/events/DomainEvents'
import { EventHandler } from '@shared/core/events/EventHandler'
import { container, inject, injectable } from 'tsyringe'

@injectable()
export class OnCommentCreated implements EventHandler {
  constructor(
    @inject(Injectable.Repositories.Topics)
    private topicsRepository: TopicsRepository,

    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      CommentCreatedEvent.name,
      this.sendNewCommentNotification.bind(this),
    )
  }

  private async sendNewCommentNotification({ comment }: CommentCreatedEvent) {
    if (!this.sendNotificationUseCase) {
      this.sendNotificationUseCase = container.resolve(SendNotificationUseCase)
    }

    const topic = await this.topicsRepository.findById(
      comment.topicId.toString(),
    )

    if (topic) {
      await this.sendNotificationUseCase.execute({
        recipientId: topic.authorId.toString(),
        title: `Um novo comentário foi criado em ${topic.title
          .substring(0, 40)
          .concat('...')}`,
        content: `${comment.content.substring(0, 120).concat('...')}`,
      })
    }
  }
}
