import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { UserPresenter } from '@module/users/presenters/userPresenter'
import { GetUserUseCase } from '@module/users/useCases/getUserUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class GetUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user

    const getUserUseCase = container.resolve(GetUserUseCase)

    const response = await getUserUseCase.execute({
      id,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    const { user } = response.value

    return res.status(statusCodeMapper.OK).json({
      user: UserPresenter.toHTTP(user),
    })
  }
}
