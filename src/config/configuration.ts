import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface Configs {
  port: number;
  database: TypeOrmModuleOptions;
}

export default (): Configs => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: false,
    logging: true,
    keepConnectionAlive: true,
    autoLoadEntities: true,
  },
});