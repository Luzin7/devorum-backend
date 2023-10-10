import { CommentWithAuthor } from '../valueObjects/commentWithAuthor'

export class CommentWithAuthorPresenter {
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {
      id: commentWithAuthor.commentId.toString(),
      content: commentWithAuthor.commentContent,
      updatedAt: commentWithAuthor.commentUpdatedAt,
      createdAt: commentWithAuthor.commentCreatedAt,
      author: {
        id: commentWithAuthor.authorId.toString(),
        name: commentWithAuthor.authorName,
      },
    }
  }
}
