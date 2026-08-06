import { configuration } from './configuration';

const config = configuration();

export const appConfig = {
  name: config.APP_NAME,
  environment: config.NODE_ENV,
  port: config.PORT,
};