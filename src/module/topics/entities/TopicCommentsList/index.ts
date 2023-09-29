import { Comment } from '@module/comments/entities/Comment'
import { WatchedList } from '@shared/core/entities/WatchedList'

export class TopicCommentsList extends WatchedList<Comment> {
  compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b)
  }
}
