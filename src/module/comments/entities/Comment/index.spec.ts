import { UniqueId } from '@shared/core/entities/UniqueId'
import { Comment } from '.'

describe('instace comment', () => {
  it('should instance a new comment', () => {
    const comment = Comment.create({
      authorId: new UniqueId(),
      authorName: 'John',
      content: 'Comentario legal',
      topicId: new UniqueId(),
    })
    expect(comment.id).toBeInstanceOf(UniqueId)
    expect(comment.createdAt).toBeInstanceOf(Date)
  })
})
