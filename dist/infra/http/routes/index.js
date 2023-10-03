"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const comments_1 = require("./comments");
const users_1 = require("./users");
const topics_1 = require("./topics");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use(users_1.usersRoutes);
routes.use(topics_1.topicsRoutes);
routes.use(comments_1.commentsRoutes);
//# sourceMappingURL=index.js.map