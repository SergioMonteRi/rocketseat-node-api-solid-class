import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils'

describe('Create Gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1234567890',
        latitude: -23.5535469,
        longitude: -46.2121275,
      })

    expect(response.statusCode).toEqual(201)
  })
})
