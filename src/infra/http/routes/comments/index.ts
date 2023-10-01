import { authMiddleware } from '@infra/http/middlewares/authMiddleware'
import { CreateCommentController } from '@module/comments/controllers/createCommentController'
import { DeleteCommentController } from '@module/comments/controllers/deleteCommentController'
import { Router } from 'express'

const createCommentController = new CreateCommentController()
const deleteCommentController = new DeleteCommentController()

const commentsRoutes = Router()

commentsRoutes.post(
  '/topics/:topicId/comments',
  authMiddleware.middle,
  createCommentController.handle,
)
commentsRoutes.delete(
  '/topics/:topicId/comments/:commentId',
  authMiddleware.middle,
  deleteCommentController.handle,
)

export { commentsRoutes }
