import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UseCaseError } from '@shared/core/errors/UseCaseError'

export class ContentIsInvalidError extends Error implements UseCaseError {
  statusCode: number = statusCodeMapper.Forbidden

  constructor() {
    super('Content have not accepted constrains')
  }
}
