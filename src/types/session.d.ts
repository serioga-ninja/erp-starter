import '@fastify/secure-session';

declare module '@fastify/secure-session' {
  interface SessionData {
    token?: string;
    state?: string;
  }
}
