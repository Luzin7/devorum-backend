import 'dotenv/config';
import { z } from 'zod';
const envSchema = z.object({
    PORT: z.coerce.number().default(7777),
    DEV_URL: z.string().url().default('http://localhost:3000'),
    TEST_URL: z.string().url().default('https://devorum-backend.vercel.app/'),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('production'),
    JWT_PRIVATE_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables', _env.error.format());
    throw new Error('Deu em cu');
}
const env = _env.data;
export { env };
//# sourceMappingURL=index.js.map