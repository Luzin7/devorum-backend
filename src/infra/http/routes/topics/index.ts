import { authMiddleware } from '@infra/http/middlewares/authMiddleware'
import { CreateTopicController } from '@module/topics/controllers/createTopicController'
import { DeleteTopicController } from '@module/topics/controllers/deleteTopicController'
import { FetchRecentTopicsController } from '@module/topics/controllers/fetchRecentTopicsController'
import { GetTopicDetailsController } from '@module/topics/controllers/getTopicDetailsController'
import { Router } from 'express'

const createTopicController = new CreateTopicController()
const getTopicDetailsController = new GetTopicDetailsController()
const deleteTopicController = new DeleteTopicController()
const fetchRecentTopicsController = new FetchRecentTopicsController()

const topicsRoutes = Router()

topicsRoutes.delete(
  '/topics/:topicId',
  authMiddleware.middle,
  deleteTopicController.handle,
)
topicsRoutes.post(
  '/topics',
  authMiddleware.middle,
  createTopicController.handle,
)
topicsRoutes.get('/topics', fetchRecentTopicsController.handle)
topicsRoutes.get('/topics/:topicId', getTopicDetailsController.handle)

export { topicsRoutes }
