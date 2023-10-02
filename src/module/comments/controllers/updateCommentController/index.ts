import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CommentPresenter } from '@module/comments/presenters/commentPresenter'
import { UpdateCommentUseCase } from '@module/comments/useCases/updateCommentUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const updateCommentBodySchema = z.object({
  content: z.string().optional(),
})

const updateCommentParamsSchema = z.object({
  commentId: z.string().uuid(),
})

export class UpdateCommentController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { commentId } = updateCommentParamsSchema.parse(req.params)
    const { content } = updateCommentBodySchema.parse(req.body)

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase)
    const response = await updateCommentUseCase.execute({
      authorId: id,
      commentId,
      content,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { comment } = response.value

    return res.status(statusCodeMapper.OK).json({
      comment: CommentPresenter.toHTTP(comment),
    })
  }
}
