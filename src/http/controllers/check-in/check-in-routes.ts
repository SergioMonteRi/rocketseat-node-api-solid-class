import { FastifyInstance } from 'fastify'

import {
  verifyJWT,
  createCheckIn,
  getUserMetrics,
  validateCheckIn,
  fetchUserCheckInsHistory,
} from '@/http'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', createCheckIn)
  app.get('/check-ins/history', fetchUserCheckInsHistory)
  app.get('/check-ins/metrics', getUserMetrics)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
}
