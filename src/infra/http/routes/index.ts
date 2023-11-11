import { Router } from 'express'
import { commentsRoutes } from './comments'
import { usersRoutes } from './users'
import { topicsRoutes } from './topics'
import { makeServerOnRoute } from './makeServerOn'

const routes = Router()

routes.use(usersRoutes)
routes.use(topicsRoutes)
routes.use(commentsRoutes)
routes.use(makeServerOnRoute)

export { routes }
