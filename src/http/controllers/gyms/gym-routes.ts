import { FastifyInstance } from 'fastify'

import { createGym, verifyJWT } from '@/http'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createGym)
}
