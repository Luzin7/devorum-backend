import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { ServiceError } from '@shared/core/errors/ServiceError'

export class PermissionDeniedError extends Error implements ServiceError {
  statusCode: number = statusCodeMapper.Unauthorized

  constructor() {
    super('Permission denied')
  }
}
