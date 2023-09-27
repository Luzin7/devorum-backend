import { container } from 'tsyringe'
import { Repositories } from '../Repositories'
import { TopicsPrismaRepository } from '@infra/database/prisma/topics/TopicsPrismaRepository'

container.registerSingleton(Repositories.Topics, TopicsPrismaRepository)
