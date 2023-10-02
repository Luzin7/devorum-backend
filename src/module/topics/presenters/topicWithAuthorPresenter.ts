import { TopicWithAuthor } from '../valueObjects/TopicWithAuthor'

export class TopicsWithAuthorPresenter {
  static toHTTP(topicWithAuthor: TopicWithAuthor) {
    return {
      topicId: topicWithAuthor.topicId.toString(),
      authorId: topicWithAuthor.authorId.toString(),
      content: topicWithAuthor.content,
      authorName: topicWithAuthor.authorName,
      topicCreatedAt: topicWithAuthor.topicCreatedAt,
      topicUpdatedAt: topicWithAuthor.topicUpdatedAt,
      numberOfComments: topicWithAuthor.numberOfComments,
    }
  }
}
