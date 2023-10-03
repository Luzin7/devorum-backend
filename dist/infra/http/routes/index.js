import { Router } from 'express';
import { commentsRoutes } from './comments';
import { usersRoutes } from './users';
import { topicsRoutes } from './topics';
const routes = Router();
routes.use(usersRoutes);
routes.use(topicsRoutes);
routes.use(commentsRoutes);
export { routes };
//# sourceMappingURL=index.js.map