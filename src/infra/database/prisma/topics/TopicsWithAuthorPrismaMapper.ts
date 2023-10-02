import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
import { Topic as TopicPrisma, User as UserPrisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

type TopicWithAuthorPrisma = TopicPrisma & {
  author: UserPrisma
  _count: {
    comments: number
  }
}

export class TopicsWithAuthorMapper {
  static toTopicWithAuthor(raw: TopicWithAuthorPrisma) {
    return TopicWithAuthor.create({
      authorId: new UniqueId(raw.author.id),
      authorName: raw.author.name,
      content: raw.content,
      topicCreatedAt: raw.createdAt,
      topicUpdatedAt: raw.updatedAt,
      topicId: new UniqueId(raw.id),
      numberOfComments: raw._count.comments,
    })
  }
}
