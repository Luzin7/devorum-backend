import { Injectable } from '@infra/containers/Injectable'
import { statusCodeMapper } from '@infra/http/statusCode/statusCodeMapper'
import { NextFunction, Request, Response } from 'express'
import { AuthConfig } from '@providers/auth/config'
import { AuthProvider } from '@providers/auth/contracts/AuthProvider'
import { container } from 'tsyringe'

export class AuthMiddleware {
  async middle(req: Request, res: Response, next: NextFunction) {
    const authProvider: AuthProvider = container.resolve(
      Injectable.Providers.Auth,
    )

    const token = req.cookies[AuthConfig.accessTokenCookie]

    if (!token || token === undefined) {
      return res.status(statusCodeMapper.Unauthorized).json({
        message: 'Unauthorized',
        statusCode: statusCodeMapper.Unauthorized,
      })
    }

    const { sub } = await authProvider.decrypt(token)

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

const authMiddleware = new AuthMiddleware()

export { authMiddleware }
