import { Topic } from '@module/topics/entities/Topic'
import { Topic as TopicPrisma, Prisma } from '@prisma/client'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class TopicsPrismaMapper {
  static toEntity(raw: TopicPrisma): Topic {
    return Topic.create(
      {
        authorId: new UniqueId(raw.authorId),
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
      content: topic.content,
      title: topic.title,
      updatedAt: topic.updatedAt,
      createdAt: topic.createdAt,
      id: topic.id.toString(),
    }
  }
}
