import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils'

describe('Get User Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)

    expect(profileResponse.body).toEqual({
      user: {
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
        created_at: expect.any(String),
        role: 'MEMBER',
      },
    })
  })
})
