import { pbkdf2Sync, randomBytes } from 'crypto'
import {
  CryptographyProvider,
  HashComparerProps,
} from '../contracts/CryptographyProvider'

export class CryptographyCryptoProvider implements CryptographyProvider {
  async hashCreator(
    plainText: string,
  ): Promise<{ hash: string; salt: string }> {
    const salt = randomBytes(16).toString('hex')

    const hash = pbkdf2Sync(plainText, salt, 10000, 64, 'sha256').toString(
      'hex',
    )

    return { hash, salt }
  }

  async hashComparer({
    hash,
    plainText,
    salt,
  }: HashComparerProps): Promise<boolean> {
    const newHash = pbkdf2Sync(plainText, salt, 10000, 64, 'sha256').toString(
      'hex',
    )

    return newHash === hash
  }
}
