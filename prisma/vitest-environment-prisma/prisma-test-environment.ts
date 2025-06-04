import 'dotenv/config'

import { prisma } from '@/lib'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import type { Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    // Create a new database for each test

    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    console.log(databaseURL)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        // Drop the database after each test
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
