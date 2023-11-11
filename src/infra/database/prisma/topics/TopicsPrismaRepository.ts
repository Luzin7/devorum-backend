import { prisma } from '@infra/database/createConnection'
import { Topic } from '@module/topics/entities/Topic'
import { TopicsPrismaMapper } from './TopicsPrismaMapper'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { FindManyRecentProps } from '@module/topics/repositories/types/FindManyRecent'
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
import { TopicDetails } from '@module/topics/valueObjects/TopicDetails'

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

  async findManyRecentWithAuthor({
    page,
    perPage,
  }: FindManyRecentProps): Promise<TopicWithAuthor[]> {
    const topics = await prisma.topic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { isDeleted: false },
      include: {
        author: true,
        _count: {
          select: {
            comments: {
              where: { isDeleted: false },
            },
          },
        },
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return topics.map(TopicsPrismaMapper.toTopicWithAuthor)
  }

  async findByIdWithDetails(id: string): Promise<TopicDetails | null> {
    const topic = await prisma.topic.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        author: true,
        _count: {
          select: {
            comments: {
              where: { isDeleted: false },
            },
          },
        },
        comments: {
          where: { isDeleted: false },
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!topic) return null

    return TopicsPrismaMapper.toTopicDetails(topic)
  }
}
