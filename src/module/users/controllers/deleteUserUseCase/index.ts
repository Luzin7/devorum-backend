import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { DeleteUserUseCase } from '@module/users/useCases/deleteUserUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    const response = await deleteUserUseCase.execute({
      id,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.NoContent).end()
  }
}
