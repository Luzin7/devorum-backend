export interface HashComparerProps {
  hash: string
  salt: string
  plainText: string
}

export abstract class CryptographyProvider {
  abstract hashCreator(
    plainText: string,
  ): Promise<{ hash: string; salt: string }>

  abstract hashComparer(props: HashComparerProps): Promise<boolean>
}
