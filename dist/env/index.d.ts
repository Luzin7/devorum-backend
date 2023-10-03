import 'dotenv/config';
import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    PORT: z.ZodDefault<z.ZodNumber>;
    DEV_URL: z.ZodDefault<z.ZodString>;
    TEST_URL: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    NODE_ENV: z.ZodDefault<z.ZodEnum<["dev", "test", "production"]>>;
    JWT_PRIVATE_KEY: z.ZodString;
    JWT_PUBLIC_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    PORT: number;
    DEV_URL: string;
    TEST_URL: string;
    DATABASE_URL: string;
    NODE_ENV: "dev" | "test" | "production";
    JWT_PRIVATE_KEY: string;
    JWT_PUBLIC_KEY: string;
}, {
    DATABASE_URL: string;
    JWT_PRIVATE_KEY: string;
    JWT_PUBLIC_KEY: string;
    PORT?: number | undefined;
    DEV_URL?: string | undefined;
    TEST_URL?: string | undefined;
    NODE_ENV?: "dev" | "test" | "production" | undefined;
}>;
type EnvSchema = z.infer<typeof envSchema>;
declare const env: EnvSchema;
export { env };
