import { Topic } from '../entities/Topic'

export class TopicPresenter {
  static toHTTP(topic: Topic) {
    return {
      id: topic.id.toString(),
      content: topic.content,
      updatedAt: topic.updatedAt,
      createdAt: topic.createdAt,
      authorId: topic.authorId.toString(),
      title: topic.title,
    }
  }
}
