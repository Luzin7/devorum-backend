import { container } from 'tsyringe';
import { Repositories } from '../Repositories';
import { CommentsPrismaRepository } from '@infra/database/prisma/comments/CommentsPrismaRepository';
container.registerSingleton(Repositories.Comments, CommentsPrismaRepository);
//# sourceMappingURL=index.js.map