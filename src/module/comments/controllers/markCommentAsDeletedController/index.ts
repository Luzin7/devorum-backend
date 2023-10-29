import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { MarkCommentAsDeletedUseCase } from '@module/comments/useCases/markCommentAsDeletedUseCase'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const markCommentAsDeletedParamsSchema = z.object({
  commentId: z.string().uuid(),
  topicId: z.string().uuid(),
})

export class MarkCommentAsDeletedController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { commentId, topicId } = markCommentAsDeletedParamsSchema.parse(
      req.params,
    )

    const markCommentAsDeletedUseCase = container.resolve(
      MarkCommentAsDeletedUseCase,
    )

    const response = await markCommentAsDeletedUseCase.execute({
      authorId: id,
      commentId,
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.NoContent).end()
  }
}
