"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoutes = void 0;
const authMiddleware_1 = require("@infra/http/middlewares/authMiddleware");
const createCommentController_1 = require("@module/comments/controllers/createCommentController");
const deleteCommentController_1 = require("@module/comments/controllers/deleteCommentController");
const updateCommentController_1 = require("@module/comments/controllers/updateCommentController");
const express_1 = require("express");
const createCommentController = new createCommentController_1.CreateCommentController();
const updateCommentController = new updateCommentController_1.UpdateCommentController();
const deleteCommentController = new deleteCommentController_1.DeleteCommentController();
const commentsRoutes = (0, express_1.Router)();
exports.commentsRoutes = commentsRoutes;
commentsRoutes.post('/topics/:topicId/comments', authMiddleware_1.authMiddleware.middle, createCommentController.handle);
commentsRoutes.patch('/comments/:commentId', authMiddleware_1.authMiddleware.middle, updateCommentController.handle);
commentsRoutes.delete('/topics/:topicId/comments/:commentId', authMiddleware_1.authMiddleware.middle, deleteCommentController.handle);
//# sourceMappingURL=index.js.map