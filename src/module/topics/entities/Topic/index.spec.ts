import { UniqueId } from '@shared/core/entities/UniqueId'
import { Topic } from '.'

describe('instace topic', () => {
  it('should instance a new topic', () => {
    const topic = Topic.create({
      authorId: new UniqueId(),
      authorName: 'John',
      title: 'Titulo legal',
    })
    expect(topic.id).toBeInstanceOf(UniqueId)
    expect(topic.createdAt).toBeInstanceOf(Date)
  })
})
