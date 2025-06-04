import { FastifyInstance } from 'fastify'

import { verifyJWT } from './middlerawes'

import { authenticate, getUserProfile, registerUser } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
}
