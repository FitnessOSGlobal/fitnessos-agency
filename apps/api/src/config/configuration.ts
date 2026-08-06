import { envSchema } from './env.schema';

export const configuration = () => {
  return envSchema.parse(process.env);
};