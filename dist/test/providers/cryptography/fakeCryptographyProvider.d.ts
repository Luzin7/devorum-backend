import { CryptographyProvider, HashComparerProps } from '@providers/cryptography/contracts/CryptographyProvider';
export declare class FakeCryptographyProvider implements CryptographyProvider {
    hashCreator(plainText: string): Promise<{
        hash: string;
        salt: string;
    }>;
    hashComparer({ hash, plainText, salt, }: HashComparerProps): Promise<boolean>;
}
