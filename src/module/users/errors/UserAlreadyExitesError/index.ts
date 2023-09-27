import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { ServiceError } from '@shared/core/errors/ServiceError'

export class UserAlreadyExitesError extends Error implements ServiceError {
  statusCode: number = statusCodeMapper.Conflict

  constructor() {
    super('User already existes')
  }
}
