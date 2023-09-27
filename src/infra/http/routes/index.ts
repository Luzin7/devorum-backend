import { Router } from 'express'
import { commentsRoutes } from './comments'

const routes = Router()

routes.use(commentsRoutes)

export { routes }
