import { ServiceError } from '@shared/core/errors/ServiceError'

export class TopicNotFoundError extends Error implements ServiceError {
  statusCode: number = 409

  constructor() {
    super('Topic not found')
  }
}
