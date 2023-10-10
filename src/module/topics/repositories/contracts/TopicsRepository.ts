import { Topic } from '@module/topics/entities/Topic'
import { FindManyRecentProps } from '../types/FindManyRecent'
import { TopicWithAuthor } from '@module/topics/valueObjects/TopicWithAuthor'
import { TopicDetails } from '@module/topics/valueObjects/TopicDetails'

export abstract class TopicsRepository {
  abstract create(topic: Topic): Promise<void>
  abstract findById(id: string): Promise<Topic | null>
  abstract findManyRecentWithAuthor(
    props: FindManyRecentProps,
  ): Promise<TopicWithAuthor[]>

  abstract findByIdWithDetails(id: string): Promise<TopicDetails | null>
  abstract delete(id: string): Promise<void>
  abstract save(topic: Topic): Promise<void>
}
