import { Topic } from '@module/topics/entities/Topic'
import { Topic as TopicPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class TopicsPrismaMapper {
  static toEntity(raw: TopicPrisma): Topic {
    return Topic.create(
      {
        authorId: new UniqueId(raw.authorId),
        authorName: raw.authorName,
        content: raw.content,
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueId(raw.id),
    )
  }

  static toPrisma(topic: Topic): Prisma.TopicUncheckedCreateInput {
    return {
      authorId: topic.authorId.toString(),
      authorName: topic.authorName,
      content: topic.content,
      title: topic.title,
      updatedAt: topic.updatedAt,
      createdAt: topic.createdAt,
      id: topic.id.toString(),
    }
  }
}
