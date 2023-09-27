import { prisma } from '@infra/database/createConnection'
import { Topic } from '@module/topics/entities/Topic'
import { TopicsPrismaMapper } from './TopicsPrismaMapper'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'

export class TopicsPrismaRepository implements TopicsRepository {
  async create(topic: Topic): Promise<void> {
    await prisma.topic.create({
      data: TopicsPrismaMapper.toPrisma(topic),
    })
  }

  async findById(id: string): Promise<Topic | null> {
    const topic = await prisma.topic.findUnique({
      where: {
        id,
      },
    })

    if (!topic) {
      return null
    }

    return TopicsPrismaMapper.toEntity(topic)
  }

  async delete(id: string): Promise<void> {
    await prisma.topic.delete({
      where: {
        id,
      },
    })
  }

  async save(topic: Topic): Promise<void> {
    await prisma.topic.update({
      where: {
        id: topic.id.toString(),
      },
      data: TopicsPrismaMapper.toPrisma(topic),
    })
  }
}
