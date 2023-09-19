import { ServiceError } from '@shared/core/errors/ServiceError'

export class UserNotFoundError extends Error implements ServiceError {
  statusCode: number = 409

  constructor() {
    super('User not found')
  }
}
