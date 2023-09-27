import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { ServiceError } from '@shared/core/errors/ServiceError'

export class UserNotFoundError extends Error implements ServiceError {
  statusCode: number = statusCodeMapper.Conflict

  constructor() {
    super('User not found')
  }
}
