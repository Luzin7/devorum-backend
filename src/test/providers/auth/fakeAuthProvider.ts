import {
  AuthProvider,
  PayloadSchema,
} from '@providers/auth/contracts/AuthProvider'

export class FakeAuthProvider implements AuthProvider {
  async encrypt(
    userId: string,
    role: 'access' | 'refresh' | undefined = 'access',
  ): Promise<string> {
    return `${userId}-${role}`
  }

  async decrypt(token: string): Promise<PayloadSchema> {
    const userId = token.split('-')[0]

    return {
      sub: userId,
    }
  }
}
