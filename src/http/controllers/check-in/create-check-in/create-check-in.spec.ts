import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils'

describe('Create Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
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

    const response = await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      })

    expect(response.statusCode).toEqual(201)
  })
})
