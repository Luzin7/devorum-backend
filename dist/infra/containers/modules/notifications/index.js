import { container } from 'tsyringe';
import { Repositories } from '../Repositories';
import { NotificationsPrismaRepository } from '@infra/database/prisma/notifications/notificationsPrismaRepository';
container.registerSingleton(Repositories.Notifications, NotificationsPrismaRepository);
//# sourceMappingURL=index.js.map