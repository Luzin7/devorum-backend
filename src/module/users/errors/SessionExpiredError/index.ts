import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UseCaseError } from '@shared/core/errors/UseCaseError'

export class SessionExpiredError extends Error implements UseCaseError {
  statusCode: number = statusCodeMapper.BadRequest

  constructor() {
    super('Session Expired')
  }
}
