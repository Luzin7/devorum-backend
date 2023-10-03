"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Repositories_1 = require("../Repositories");
const TopicsPrismaRepository_1 = require("@infra/database/prisma/topics/TopicsPrismaRepository");
tsyringe_1.container.registerSingleton(Repositories_1.Repositories.Topics, TopicsPrismaRepository_1.TopicsPrismaRepository);
//# sourceMappingURL=index.js.map