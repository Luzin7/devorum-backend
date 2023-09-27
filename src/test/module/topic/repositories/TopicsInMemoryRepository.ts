import { Topic } from '@module/topics/entities/Topic'
import { TopicsRepository } from '@module/topics/repositories/contracts/TopicsRepository'
import { UniqueId } from '@shared/core/entities/UniqueId'

export class TopicsInMemoryRepository extends TopicsRepository {
  topics: Topic[] = []

  async save(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(topic: Topic): Promise<void> {
    this.topics.push(topic)
  }

  async findById(id: string): Promise<Topic | null> {
    const topic = this.topics.find((topic) => topic.id.equals(new UniqueId(id)))
    return topic ?? null
  }

  async delete(id: string): Promise<void> {
    this.topics = this.topics.filter(
      (topic) => !topic.id.equals(new UniqueId(id)),
    )
  }
}
