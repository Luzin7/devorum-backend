import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UseCaseError } from '@shared/core/errors/UseCaseError'

export class WrongCredentialsError extends Error implements UseCaseError {
  statusCode: number = statusCodeMapper.Unauthorized

  constructor() {
    super('Wrong credentials')
  }
}
