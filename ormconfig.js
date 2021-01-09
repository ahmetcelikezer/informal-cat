const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env')});

module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  logging: true,
  synchronize: false,
  entities: ['src/**/entity/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};