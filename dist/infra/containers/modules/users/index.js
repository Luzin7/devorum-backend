"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Repositories_1 = require("../Repositories");
const UsersPrismaRepository_1 = require("@infra/database/prisma/users/UsersPrismaRepository");
tsyringe_1.container.registerSingleton(Repositories_1.Repositories.Users, UsersPrismaRepository_1.UsersPrismaRepository);
//# sourceMappingURL=index.js.map