import { authMiddleware } from '@infra/http/middlewares/authMiddleware'
import { CreateCommentController } from '@module/comments/controllers/createCommentController'
import { DeleteCommentController } from '@module/comments/controllers/deleteCommentController'
import { UpdateCommentController } from '@module/comments/controllers/updateCommentController'
import { MarkCommentAsDeletedController } from '@module/comments/controllers/markCommentAsDeletedController'
import { Router } from 'express'

const createCommentController = new CreateCommentController()
const updateCommentController = new UpdateCommentController()
const deleteCommentController = new DeleteCommentController()
const markCommentAsDeletedController = new MarkCommentAsDeletedController()

const commentsRoutes = Router()

commentsRoutes.post(
  '/topics/:topicId/comments',
  authMiddleware.middle,
  createCommentController.handle,
)

commentsRoutes.patch(
  '/comments/:commentId',
  authMiddleware.middle,
  updateCommentController.handle,
)

commentsRoutes.delete(
  '/topics/:topicId/comments/:commentId',
  authMiddleware.middle,
  deleteCommentController.handle,
)

commentsRoutes.patch(
  '/topics/:topicId/comments/:commentId/isDeleted',
  authMiddleware.middle,
  markCommentAsDeletedController.handle,
)

export { commentsRoutes }
