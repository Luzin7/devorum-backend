import { TopicWithAuthor } from '../valueObjects/TopicWithAuthor'

export class TopicsWithAuthorPresenter {
  static toHTTP(topicWithAuthor: TopicWithAuthor) {
    return {
      id: topicWithAuthor.topicId.toString(),
      author: {
        id: topicWithAuthor.authorId.toString(),
        name: topicWithAuthor.authorName,
      },
      title: topicWithAuthor.topicTitle,
      assertion: topicWithAuthor.topicAssertion,
      createdAt: topicWithAuthor.topicCreatedAt,
      updatedAt: topicWithAuthor.topicUpdatedAt,
      numberOfComments: topicWithAuthor.numberOfComments,
    }
  }
}
