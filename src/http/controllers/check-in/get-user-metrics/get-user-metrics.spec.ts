import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils'

describe('Get User Metrics (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user metrics', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'TypeScript Gym description',
        phone: '1234567890',
        latitude: -23.5535469,
        longitude: -46.2121275,
      })

    const nearbyGymsResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      })
      .set('Authorization', `Bearer ${token}`)

    const gymId = nearbyGymsResponse.body.gyms[0].id

    await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(1)
  })
})
