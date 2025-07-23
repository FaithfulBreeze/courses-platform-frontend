import 'dotenv/config';
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_NODE_ENV == ENVIRONMENTS.PRODUCTION
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : 'http://localhost:3000';
