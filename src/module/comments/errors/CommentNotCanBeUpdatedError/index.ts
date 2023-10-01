import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UseCaseError } from '@shared/core/errors/UseCaseError'

export class CommentNotCanBeUpdatedError extends Error implements UseCaseError {
  statusCode: number = statusCodeMapper.Conflict

  constructor() {
    super('Comment not can update')
  }
}
