import { AuthMiddleware } from '@infra/http/middlewares/authMiddleware'
import { DeleteCommentController } from '@module/comments/controllers/deleteCommentController'
import { Router } from 'express'
import { container } from 'tsyringe'

const deleteCommentController = new DeleteCommentController()

const authMiddleware = container.resolve(AuthMiddleware)

const commentsRoutes = Router()

commentsRoutes.use(authMiddleware.middle)
commentsRoutes.delete(
  '/topics/:topicId/comments/:commentId',
  deleteCommentController.handle,
)

export { commentsRoutes }
