"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicsRoutes = void 0;
const authMiddleware_1 = require("@infra/http/middlewares/authMiddleware");
const createTopicController_1 = require("@module/topics/controllers/createTopicController");
const deleteTopicController_1 = require("@module/topics/controllers/deleteTopicController");
const fetchRecentTopicsController_1 = require("@module/topics/controllers/fetchRecentTopicsController");
const express_1 = require("express");
const createTopicController = new createTopicController_1.CreateTopicController();
const deleteTopicController = new deleteTopicController_1.DeleteTopicController();
const fetchRecentTopicsController = new fetchRecentTopicsController_1.FetchRecentTopicsController();
const topicsRoutes = (0, express_1.Router)();
exports.topicsRoutes = topicsRoutes;
topicsRoutes.post('/topics', authMiddleware_1.authMiddleware.middle, createTopicController.handle);
topicsRoutes.delete('/topics/:topicId', authMiddleware_1.authMiddleware.middle, deleteTopicController.handle);
topicsRoutes.get('/topics', authMiddleware_1.authMiddleware.middle, fetchRecentTopicsController.handle);
//# sourceMappingURL=index.js.map