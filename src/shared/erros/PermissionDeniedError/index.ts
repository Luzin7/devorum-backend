import { ServiceError } from '@shared/core/errors/ServiceError'

export class PermissioDenidedError extends Error implements ServiceError {
  statusCode: number = 401

  constructor() {
    super('Permission denied')
  }
}
