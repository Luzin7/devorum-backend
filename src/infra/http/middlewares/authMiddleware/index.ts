import { Injectable } from '@infra/containers/Injectable'
import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { NextFunction, Request, Response } from 'express'
import { AuthConfig } from 'providers/auth/config'
import { AuthProvider } from 'providers/auth/contracts/AuthProvider'
import { inject, injectable } from 'tsyringe'

@injectable()
export class AuthMiddleware {
  constructor(
    @inject(Injectable.Providers.Auth)
    private readonly authProvider: AuthProvider,
  ) {}

  async middle(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[AuthConfig.accessTokenCookie]

    if (!token || token === undefined) {
      return res.status(statusCodeMapper.Unauthorized).json({
        message: 'Unauthorized',
        statusCode: statusCodeMapper.Unauthorized,
      })
    }

    const { sub } = await this.authProvider.decrypt(token)

    if (!sub) {
      return res.status(statusCodeMapper.Unauthorized).json({
        message: 'Unauthorized',
        statusCode: statusCodeMapper.Unauthorized,
      })
    }

    req.user = {
      id: sub,
    }

    next()
  }
}
