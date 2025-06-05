import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http'

import {
  refreshToken,
  registerUser,
  getUserProfile,
  authenticateUser,
} from '..'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)
  app.post('/sessions', authenticateUser)

  app.patch('/token/refresh', refreshToken)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
}
