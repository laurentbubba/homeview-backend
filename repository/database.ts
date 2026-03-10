import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10,                 // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Fail fast if DB is unreachable
});

const adapter = new PrismaPg(pool);

const database = new PrismaClient({ 
  adapter,
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
 });

export default database;