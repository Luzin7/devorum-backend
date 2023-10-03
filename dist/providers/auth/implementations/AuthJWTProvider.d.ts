import { AuthProvider, PayloadSchema } from '../contracts/AuthProvider';
export declare class AuthJWTProvider implements AuthProvider {
    encrypt(userId: string, role?: 'access' | 'refresh'): Promise<string>;
    decrypt(token: string): Promise<PayloadSchema>;
}
