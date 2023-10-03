import { AuthProvider, PayloadSchema } from '@providers/auth/contracts/AuthProvider';
export declare class FakeAuthProvider implements AuthProvider {
    encrypt(userId: string, role?: 'access' | 'refresh' | undefined): Promise<string>;
    decrypt(token: string): Promise<PayloadSchema>;
}
