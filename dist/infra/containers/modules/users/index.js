import { container } from 'tsyringe';
import { Repositories } from '../Repositories';
import { UsersPrismaRepository } from '@infra/database/prisma/users/UsersPrismaRepository';
container.registerSingleton(Repositories.Users, UsersPrismaRepository);
//# sourceMappingURL=index.js.map