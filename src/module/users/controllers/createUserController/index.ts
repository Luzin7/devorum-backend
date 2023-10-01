import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { CreateUserUseCase } from '@module/users/useCases/createUserUseCase'
import { Controller } from '@shared/core/infra/Controller'
import { ErrorPresenter } from '@shared/presenters/ErrorPresenter'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(4),
})

export class CreateUserController implements Controller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = createUserBodySchema.parse(req.body)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const response = await createUserUseCase.execute({
      email,
      name,
      password,
    })

    if (response.isLeft()) {
      const error = response.value
      return ErrorPresenter.toHTTP(req, res, error)
    }

    return res.status(statusCodeMapper.Created).end()
  }
}
