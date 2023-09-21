import { Topic } from '@module/topics/entities/Topic'

export abstract class TopicsRepository {
  abstract create(topic: Topic): Promise<void>
  abstract findById(id: string): Promise<Topic | null>
  abstract delete(id: string): Promise<void>
  abstract save(topic: Topic): Promise<void>
}
