import {
  CryptographyProvider,
  HashComparerProps,
} from '@providers/cryptography/contracts/CryptographyProvider'
import { randomBytes } from 'crypto'

export class FakeCryptographyProvider implements CryptographyProvider {
  async hashCreator(
    plainText: string,
  ): Promise<{ hash: string; salt: string }> {
    const randomSalt = randomBytes(8).toString()

    return {
      hash: `${plainText}${randomSalt}-hashed`,
      salt: randomSalt,
    }
  }

  async hashComparer({
    hash,
    plainText,
    salt,
  }: HashComparerProps): Promise<boolean> {
    return `${plainText}${salt}-hashed` === hash
  }
}
