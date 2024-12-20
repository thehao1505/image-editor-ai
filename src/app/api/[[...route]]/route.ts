import { Context, Hono } from 'hono';
import { handle } from 'hono/vercel';
import { AuthConfig, initAuthConfig } from '@hono/auth-js';
import images from './images';
import ai from './ai';
import users from './users';
import authConfig from '@/auth.config';
import projects from './projects';
import subscriptions from './subscriptions';

export const runtime = 'nodejs';

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath('/api');

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route('/ai', ai)
  .route('/projects', projects)
  .route('/images', images)
  .route('/subscriptions', subscriptions)
  .route('/users', users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;