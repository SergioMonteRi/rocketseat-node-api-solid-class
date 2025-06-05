import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils'

describe('Nearby Gyms (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        description: 'Near Gym description',
        phone: '1234567890',
        latitude: -23.5535469,
        longitude: -46.2121275,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: 'TypeScript Gym description',
        phone: '1234567890',
        latitude: -20.5535469,
        longitude: -40.2121275,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        userLatitude: -23.5535469,
        userLongitude: -46.2121275,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms[0].title).toEqual('Near Gym')
  })
})
