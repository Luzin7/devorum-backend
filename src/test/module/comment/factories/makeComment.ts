import { fakerPT_BR } from '@faker-js/faker'
import { Comment, CommentProps } from '@module/comments/entities/Comment'
import { UniqueId } from '@shared/core/entities/UniqueId'

export function makeComment(
  override: Partial<CommentProps> = {},
  id?: UniqueId,
) {
  const comment = Comment.create(
    {
      authorId: new UniqueId(fakerPT_BR.string.uuid()),
      authorName: fakerPT_BR.person.fullName(),
      content: fakerPT_BR.lorem.sentence(5),
      topicId: new UniqueId(fakerPT_BR.string.uuid()),
      ...override,
    },
    id,
  )

  return comment
}
