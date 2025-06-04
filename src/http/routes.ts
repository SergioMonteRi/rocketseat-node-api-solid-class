import { FastifyInstance } from 'fastify'

import { verifyJWT } from './middlerawes'

import { authenticate, profile, register } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
