import { ServiceError } from '@shared/core/errors/ServiceError'

export class UserAlreadyExitesError extends Error implements ServiceError {
  statusCode: number = 409

  constructor() {
    super('User already existes')
  }
}
