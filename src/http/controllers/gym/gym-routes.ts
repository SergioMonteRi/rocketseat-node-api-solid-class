import { FastifyInstance } from 'fastify'

import { createGym, nearbyGyms, searchGyms, verifyJWT } from '@/http'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', nearbyGyms)
}
