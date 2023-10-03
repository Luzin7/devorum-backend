export interface PayloadSchema {
    sub: string | null;
}
export declare abstract class AuthProvider {
    abstract encrypt(userId: string, role?: 'access' | 'refresh'): Promise<string>;
    abstract decrypt(token: string): Promise<PayloadSchema>;
}
