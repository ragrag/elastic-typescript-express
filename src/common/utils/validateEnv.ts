import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DATABASE_URL_PROD: str(),
    DATABASE_URL_DEV: str(),
    FACEBOOK_APP_ID: str(),
    FACEBOOK_APP_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;
