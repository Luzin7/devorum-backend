import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRespository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { CreateCommentUseCase } from '.'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { CommentsInMemoryRepository } from '@test/module/comment/repositories/CommentsInMemoryRespository'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'

let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let commentsRepository: CommentsInMemoryRepository
let sut: CreateCommentUseCase

describe('create comment', () => {
  beforeEach(() => {
    topicsRepository = new TopicsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    commentsRepository = new CommentsInMemoryRepository()

    sut = new CreateCommentUseCase(
      topicsRepository,
      commentsRepository,
      usersRepository,
    )
  })

  it('should be able to create an new comment', async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })

    usersRepository.create(user)
    topicsRepository.create(topic)

    const response = await sut.execute({
      content: 'content',
      authorId: user.id.toString(),
      topicId: topic.id.toString(),
    })

    expect(response.isRight()).toEqual(true)
    expect(commentsRepository.comments[0].content).toEqual('content')
    expect(commentsRepository.comments[0].authorId.toString()).toEqual(
      user.id.toString(),
    )
    expect(commentsRepository.comments[0].topicId.toString()).toEqual(
      topic.id.toString(),
    )
  })

  it('not should be able to create an new comment if user doesnt exists', async () => {
    const topic = makeTopic()
    topicsRepository.create(topic)

    const response = await sut.execute({
      content: 'content',
      authorId: 'idlegal',
      topicId: topic.id.toString(),
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserNotFoundError)
  })

  it('not should be able to create an new comment if topic doesnt exists', async () => {
    const user = makeUser()
    usersRepository.create(user)

    const response = await sut.execute({
      content: 'content',
      authorId: user.id.toString(),
      topicId: 'idlegal',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(TopicNotFoundError)
  })
})