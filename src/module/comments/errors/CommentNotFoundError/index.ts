import { ServiceError } from '@shared/core/errors/ServiceError'

export class CommentNotFoundError extends Error implements ServiceError {
  statusCode: number = 409

  constructor() {
    super('Comment not found')
  }
}
