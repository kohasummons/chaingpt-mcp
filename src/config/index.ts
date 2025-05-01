import dotenv from 'dotenv';
import {z} from 'zod';

dotenv.config();

const envSchema = z.object({
  CHAINGPT_SECRET_KEY: z.string().min(1, 'ChainGPT Secret Key is required'),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('Invalid environment variables:', envParse.error.format());
  throw new Error('Invalid environment variables');
}

export const config = {
  chaingpt: {
    secretKey: envParse.data.CHAINGPT_SECRET_KEY,
  },
} as const;
