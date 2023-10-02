import { Comment } from '../entities/Comment'

export class CommentPresenter {
  static toHTTP(comment: Comment) {
    return {
      id: comment.id.toString(),
      content: comment.content,
      updatedAt: comment.updatedAt,
      createdAt: comment.createdAt,
      authorId: comment.authorId.toString(),
      topicId: comment.topicId.toString(),
    }
  }
}
