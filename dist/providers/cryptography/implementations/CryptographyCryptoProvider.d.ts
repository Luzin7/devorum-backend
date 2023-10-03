import { CryptographyProvider, HashComparerProps } from '../contracts/CryptographyProvider';
export declare class CryptographyCryptoProvider implements CryptographyProvider {
    hashCreator(plainText: string): Promise<{
        hash: string;
        salt: string;
    }>;
    hashComparer({ hash, plainText, salt, }: HashComparerProps): Promise<boolean>;
}
