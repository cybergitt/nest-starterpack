import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
  console.log(
    `App Running on ${process.env.APP_ENV} with Port ${process.env.APP_PORT}`,
  );
}
bootstrap().catch((e) => {
  console.error(e);
});
