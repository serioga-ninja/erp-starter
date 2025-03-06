import type { FastifyRequest as Request } from 'fastify';
import { TokenPayload } from '../auth/types';

declare module 'fastify' {
  interface FastifyRequest extends Request {
    user?: TokenPayload;
  }
}
