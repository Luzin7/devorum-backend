import { Topic } from '@module/topics/entities/Topic'
import { TopicDetails } from '@module/topics/valueObjects/TopicDetails'
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
import {
  Topic as TopicPrisma,
  User as UserPrisma,
  Comment as CommentPrisma,
  Prisma,
} from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'
import { CommentsPrismaMapper } from '../comments/CommentsPrismaMapper'

type TopicWithAuthorPrisma = TopicPrisma & {
  author: UserPrisma
  _count: {
    comments: number
  }
}

type TopicDetailsPrisma = TopicPrisma & {
  author: UserPrisma
  _count: {
    comments: number
  }
  comments: (CommentPrisma & {
    author: UserPrisma
  })[]
}

export class TopicsPrismaMapper {
  static toEntity(raw: TopicPrisma): Topic {
    return Topic.create(
      {
        authorId: new UniqueId(raw.authorId),
        content: raw.content,
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        isDeleted: raw.isDeleted,
      },
      new UniqueId(raw.id),
    )
  }

  static toTopicWithAuthor(raw: TopicWithAuthorPrisma) {
    return TopicWithAuthor.create({
      authorId: new UniqueId(raw.author.id),
      authorName: raw.author.name,
      topicContent: raw.content,
      topicCreatedAt: raw.createdAt,
      topicUpdatedAt: raw.updatedAt,
      topicId: new UniqueId(raw.id),
      numberOfComments: raw._count.comments,
      topicTitle: raw.title,
    })
  }

  static toTopicDetails(raw: TopicDetailsPrisma) {
    return TopicDetails.create({
      authorId: new UniqueId(raw.author.id),
      authorName: raw.author.name,
      topicContent: raw.content,
      topicCreatedAt: raw.createdAt,
      topicId: new UniqueId(raw.id),
      topicTitle: raw.title,
      topicUpdatedAt: raw.updatedAt,
      numberOfComments: raw._count.comments,
      topicCommentsWithAuthor: raw.comments.map(
        CommentsPrismaMapper.toCommentWithAuthor,
      ),
    })
  }

  static toPrisma(topic: Topic): Prisma.TopicUncheckedCreateInput {
    return {
      authorId: topic.authorId.toString(),
      content: topic.content,
      title: topic.title,
      updatedAt: topic.updatedAt,
      createdAt: topic.createdAt,
      id: topic.id.toString(),
      isDeleted: topic.isDeleted,
    }
  }
}
