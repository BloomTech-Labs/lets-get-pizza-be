// Update with your config settings.

require('dotenv').config();
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Masamune0',
      database: 'plzalocal',
      charset: 'utf8'
    },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  },


  testing: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Masamune0',
        database: 'plzatest',
        charset: 'utf8'
      },
      migrations: { directory: './data/migrations' },
      seeds: { directory: './data/seeds' }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' }
  }

};
