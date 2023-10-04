import { authMiddleware } from '@infra/http/middlewares/authMiddleware'
import { CreateTopicController } from '@module/topics/controllers/createTopicController'
import { DeleteTopicController } from '@module/topics/controllers/deleteTopicController'
import { FetchRecentTopicsController } from '@module/topics/controllers/fetchRecentTopicsController'
import { Router } from 'express'

const createTopicController = new CreateTopicController()
const deleteTopicController = new DeleteTopicController()
const fetchRecentTopicsController = new FetchRecentTopicsController()

const topicsRoutes = Router()

topicsRoutes.post('/topics', createTopicController.handle)
topicsRoutes.delete(
  '/topics/:topicId',
  authMiddleware.middle,
  deleteTopicController.handle,
)
topicsRoutes.get(
  '/topics',
  authMiddleware.middle,
  fetchRecentTopicsController.handle,
)

export { topicsRoutes }
