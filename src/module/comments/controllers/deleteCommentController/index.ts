import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { DeleteCommentUseCase } from '@module/comments/useCases/deleteCommentUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const DeleteCommentParamsSchema = z.object({
  commentId: z.string().uuid(),
  topicId: z.string().uuid(),
})

export class DeleteCommentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { commentId, topicId } = DeleteCommentParamsSchema.parse(req.params)

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase)
    const response = await deleteCommentUseCase.execute({
      authorId: id,
      commentId,
      topicId,
    })

    if (response.isLeft()) {
      const error = response.value

      return res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
      })
    }

    return res.status(statusCodeMapper.NoContent).end()
  }
}
