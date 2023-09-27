import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { UserNotFoundError } from '@module/users/errors/UserNotFoundError'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { CommentsInMemoryRepository } from '@test/module/comment/repositories/CommentsInMemoryRepository'
import { TopicNotFoundError } from '@module/topics/errors/TopicNotFoundError'
import { DeleteCommentUseCase } from '.'
import { makeComment } from '@test/module/comment/factories/makeComment'

let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let commentsRepository: CommentsInMemoryRepository
let sut: DeleteCommentUseCase

describe('create comment', () => {
  beforeEach(() => {
    topicsRepository = new TopicsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    commentsRepository = new CommentsInMemoryRepository()

    sut = new DeleteCommentUseCase(
      topicsRepository,
      commentsRepository,
      usersRepository,
    )
  })

  it('should be able to delete a comment', async () => {
    const user = makeUser()
    const topic = makeTopic({ authorId: user.id })
    const comment = makeComment({ topicId: topic.id, authorId: user.id })

    usersRepository.create(user)
    topicsRepository.create(topic)
    commentsRepository.create(comment)

    const response = await sut.execute({
      authorId: user.id.toString(),
      topicId: topic.id.toString(),
      commentId: comment.id.toString(),
    })

    expect(response.isRight()).toEqual(true)
    expect(commentsRepository.comments.length).toEqual(0)
  })

  it('not should be able to delete a comment if user doesnt exists', async () => {
    const topic = makeTopic()
    const comment = makeComment({ topicId: topic.id })

    commentsRepository.create(comment)
    topicsRepository.create(topic)

    const response = await sut.execute({
      authorId: 'idlegal',
      topicId: topic.id.toString(),
      commentId: comment.id.toString(),
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(UserNotFoundError)
  })

  it('not should be able to create an new comment if topic doesnt exists', async () => {
    const user = makeUser()
    const comment = makeComment({ authorId: user.id })

    commentsRepository.create(comment)
    usersRepository.create(user)

    const response = await sut.execute({
      authorId: user.id.toString(),
      topicId: 'idlegal',
      commentId: comment.id.toString(),
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(TopicNotFoundError)
  })
})
