import envValidation from '@common/utils/env.validation';
import { registerAs } from '@nestjs/config';
import {
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsUrl,
  IsString,
} from 'class-validator';
import { AppConfig } from './config.type';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsString()
  APP_NAME: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  CLIENT_HOST: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  SERVER_HOST: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>('app', () => {
  envValidation(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    name: process.env.APP_NAME ?? 'App',
    workingDirectory: process.env.PWD ?? process.cwd(),
    clientHost: process.env.APP_CLIENT_HOST,
    serverHost: process.env.APP_SERVER_HOST ?? 'http://localhost',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
    apiPrefix: process.env.API_PREFIX ?? 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE ?? 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE ?? 'x-custom-lang',
  };
});
