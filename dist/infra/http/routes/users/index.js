"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const authMiddleware_1 = require("@infra/http/middlewares/authMiddleware");
const createSessionController_1 = require("@module/users/controllers/createSessionController");
const createUserController_1 = require("@module/users/controllers/createUserController");
const deleteUserUseCase_1 = require("@module/users/controllers/deleteUserUseCase");
const getUserController_1 = require("@module/users/controllers/getUserController");
const express_1 = require("express");
const createUserController = new createUserController_1.CreateUserController();
const createSessionController = new createSessionController_1.CreateSessionController();
const getUserController = new getUserController_1.GetUserController();
const deleteUserController = new deleteUserUseCase_1.DeleteUserController();
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
usersRoutes.post('/users', createUserController.handle);
usersRoutes.post('/sessions', createSessionController.handle);
usersRoutes.get('/users', authMiddleware_1.authMiddleware.middle, getUserController.handle);
usersRoutes.delete('/users', authMiddleware_1.authMiddleware.middle, deleteUserController.handle);
//# sourceMappingURL=index.js.map