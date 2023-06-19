import { ConfigService } from '@nestjs/config';

export const DefaultDatabaseFactory = (config: ConfigService) => {
  return config.get('dbpostgres');
};
