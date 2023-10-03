"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const Repositories_1 = require("../Repositories");
const CommentsPrismaRepository_1 = require("@infra/database/prisma/comments/CommentsPrismaRepository");
tsyringe_1.container.registerSingleton(Repositories_1.Repositories.Comments, CommentsPrismaRepository_1.CommentsPrismaRepository);
//# sourceMappingURL=index.js.map