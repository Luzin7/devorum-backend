import { CommentWithAuthorPresenter } from '@module/comments/presenters/commentWithAuthorPresenter'
import { TopicDetails } from '../valueObjects/TopicDetails'

export class TopicsDetailsPresenter {
  static toHTTP(topicDetails: TopicDetails) {
    return {
      id: topicDetails.topicId.toString(),
      author: {
        id: topicDetails.authorId.toString(),
        name: topicDetails.authorName,
      },
      title: topicDetails.topicTitle,
      content: topicDetails.topicContent,
      createdAt: topicDetails.topicCreatedAt,
      updatedAt: topicDetails.topicUpdatedAt,
      numberOfComments: topicDetails.numberOfComments,
      comments: topicDetails.topicCommentsWithAuthor.map(
        CommentWithAuthorPresenter.toHTTP,
      ),
    }
  }
}
