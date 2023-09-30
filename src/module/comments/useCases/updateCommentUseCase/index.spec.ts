import 'reflect-metadata'
import { UsersInMemoryRepository } from '@test/module/user/repositories/UsersInMemoryRepository'
import { TopicsInMemoryRepository } from '@test/module/topic/repositories/TopicsInMemoryRepository'
import { makeUser } from '@test/module/user/factories/makeUser'
import { makeTopic } from '@test/module/topic/factories/makeTopic'
import { CommentsInMemoryRepository } from '@test/module/comment/repositories/CommentsInMemoryRepository'
import { makeComment } from '@test/module/comment/factories/makeComment'
import { UpdateCommentUseCase } from '.'
import { CommentNotFoundError } from '@module/comments/errors/CommentNotFoundError'
import { PermissionDeniedError } from '@shared/errors/PermissionDeniedError'
import { CommentNotCanBeUpdatedError } from '@module/comments/errors/CommentNotCanBeUpdatedError'
import { NotificationsInMemoryRepository } from '@test/module/notification/repositories/NotificationsInMemory'

let notificationsRepository: NotificationsInMemoryRepository
let topicsRepository: TopicsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let commentsRepository: CommentsInMemoryRepository
let sut: UpdateCommentUseCase

describe('update comment', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository(notificationsRepository)
    topicsRepository = new TopicsInMemoryRepository(usersRepository)
    commentsRepository = new CommentsInMemoryRepository()

    sut = new UpdateCommentUseCase(commentsRepository)
  })

  it('should be able to update a comment', async () => {
    const user = makeUser()
    const topic = makeTopic()
    const comment = makeComment({
      topicId: topic.id,
      authorId: user.id,
      content: 'Initial content',
    })

    usersRepository.create(user)
    topicsRepository.create(topic)
    commentsRepository.create(comment)

    const response = await sut.execute({
      authorId: user.id.toString(),
      commentId: comment.id.toString(),
      content: 'New content',
    })

    expect(response.isRight()).toEqual(true)
    expect(commentsRepository.comments[0].content).toEqual('New content')
    expect(commentsRepository.comments[0].updatedAt).toBeInstanceOf(Date)
  })

  it('not should be able to update a comment if comment doesnt exists', async () => {
    const user = makeUser()

    const response = await sut.execute({
      authorId: user.id.toString(),
      commentId: 'unixistent-comment-id',
      content: 'A new content',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(CommentNotFoundError)
  })

  it('not should be able to update a comment if comment are of another user', async () => {
    const user = makeUser()
    const user2 = makeUser()
    const topic = makeTopic()
    const comment = makeComment({
      topicId: topic.id,
      authorId: user.id,
      content: 'Initial content',
    })

    usersRepository.create(user)
    usersRepository.create(user2)
    topicsRepository.create(topic)
    commentsRepository.create(comment)

    const response = await sut.execute({
      authorId: user2.id.toString(),
      commentId: comment.id.toString(),
      content: 'A new content',
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(PermissionDeniedError)
  })

  it('not should be able to update a comment if nothing are updated', async () => {
    const user = makeUser()
    const topic = makeTopic()
    const comment = makeComment({
      topicId: topic.id,
      authorId: user.id,
      content: 'Initial content',
    })

    usersRepository.create(user)
    topicsRepository.create(topic)
    commentsRepository.create(comment)

    const response = await sut.execute({
      authorId: user.id.toString(),
      commentId: comment.id.toString(),
    })

    expect(response.isLeft()).toEqual(true)
    expect(response.value).toBeInstanceOf(CommentNotCanBeUpdatedError)
  })
})
