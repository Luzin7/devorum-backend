import { UniqueId } from '@shared/core/entities/UniqueId'
import { Topic } from '.'

describe('Instance topic', () => {
  it('should instance a new topic', () => {
    const topic = Topic.create({
      authorId: new UniqueId(),
      title: 'Titulo legal',
      content: 'Cool content',
      isDeleted: false,
    })
    expect(topic.id).toBeInstanceOf(UniqueId)
    expect(topic.createdAt).toBeInstanceOf(Date)
    expect(topic.content).toEqual('Cool content')
    expect(topic.isDeleted).toBe(false)
  })
})
