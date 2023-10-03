"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Repositories_1 = require("../Repositories");
const notificationsPrismaRepository_1 = require("@infra/database/prisma/notifications/notificationsPrismaRepository");
tsyringe_1.container.registerSingleton(Repositories_1.Repositories.Notifications, notificationsPrismaRepository_1.NotificationsPrismaRepository);
//# sourceMappingURL=index.js.map