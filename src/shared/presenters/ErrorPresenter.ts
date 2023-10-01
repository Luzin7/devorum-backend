import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UseCaseError } from '@shared/core/errors/UseCaseError'
import { Request, Response } from 'express'

export class ErrorPresenter {
  static toHTTP(req: Request, res: Response, err: UseCaseError | null) {
    return res.status(err?.statusCode ?? statusCodeMapper.BadRequest).json({
      message: err?.message ?? 'Bad request',
      statusCode: err?.statusCode ?? statusCodeMapper.BadRequest,
    })
  }
}
