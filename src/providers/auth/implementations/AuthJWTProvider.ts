import { env } from '@env/index'
import { AuthProvider, PayloadSchema } from '../contracts/AuthProvider'
import jwt from 'jsonwebtoken'

export class AuthJWTProvider implements AuthProvider {
  async encrypt(
    userId: string,
    role: 'access' | 'refresh' = 'access',
  ): Promise<string> {
    const secretKey = Buffer.from(env.JWT_PRIVATE_KEY, 'base64')

    const token = jwt.sign({ sub: userId }, secretKey, {
      algorithm: 'RS256',
      expiresIn:
        role === 'access'
          ? 60 * 5 // 5 minutes
          : 60 * 60 * 24 * 7, // 7 days,
    })

    return token
  }

  async decrypt(token: string): Promise<PayloadSchema> {
    const publicKey = Buffer.from(env.JWT_PUBLIC_KEY, 'base64')

    try {
      const { sub } = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      })

      return {
        sub: sub ? sub.toString() : null,
      }
    } catch (err) {
      return {
        sub: null,
      }
    }
  }
}
