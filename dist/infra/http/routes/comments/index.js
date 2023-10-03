import { authMiddleware } from '@infra/http/middlewares/authMiddleware';
import { CreateCommentController } from '@module/comments/controllers/createCommentController';
import { DeleteCommentController } from '@module/comments/controllers/deleteCommentController';
import { UpdateCommentController } from '@module/comments/controllers/updateCommentController';
import { Router } from 'express';
const createCommentController = new CreateCommentController();
const updateCommentController = new UpdateCommentController();
const deleteCommentController = new DeleteCommentController();
const commentsRoutes = Router();
commentsRoutes.post('/topics/:topicId/comments', authMiddleware.middle, createCommentController.handle);
commentsRoutes.patch('/comments/:commentId', authMiddleware.middle, updateCommentController.handle);
commentsRoutes.delete('/topics/:topicId/comments/:commentId', authMiddleware.middle, deleteCommentController.handle);
export { commentsRoutes };
//# sourceMappingURL=index.js.map