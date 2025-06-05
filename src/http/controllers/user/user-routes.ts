import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http'

import { authenticateUser, getUserProfile, registerUser } from '..'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticateUser)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
}
