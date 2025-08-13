import type { Knex } from 'knex';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, './dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  
  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || path.join(__dirname, './prod.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};

export default config;
