"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(7777),
    DEV_URL: zod_1.z.string().url().default('http://localhost:3000'),
    TEST_URL: zod_1.z.string().url().default('https://turma-qa-frontend.vercel.app'),
    DATABASE_URL: zod_1.z.string().url(),
    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']).default('production'),
    JWT_PRIVATE_KEY: zod_1.z.string(),
    JWT_PUBLIC_KEY: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables', _env.error.format());
    throw new Error('Deu em cu');
}
const env = _env.data;
exports.env = env;
//# sourceMappingURL=index.js.map