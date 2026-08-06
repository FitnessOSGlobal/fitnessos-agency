import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().positive().default(3000),

  APP_NAME: z.string().default('FitnessOS API'),
});

export type Env = z.infer<typeof envSchema>;