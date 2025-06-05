import { FastifyInstance } from 'fastify'

import {
  verifyJWT,
  createGym,
  nearbyGyms,
  searchGyms,
  verifyUserRole,
} from '@/http'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', { onRequest: verifyUserRole('ADMIN') }, createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', nearbyGyms)
}
