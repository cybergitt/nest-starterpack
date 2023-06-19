import { AllConfigType } from '@infrastructure/config/config.type';
import {
  VersioningType,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import validationOptions from '@common/utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // allows class-validator to use NestJS dependency injection container
  const configService = app.get(ConfigService<AllConfigType>);

  app.enableShutdownHooks();
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // const options = new DocumentBuilder()
  //   .setTitle('Starterpack API')
  //   .setDescription('API docs')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
  console.log(
    `App Running on ${process.env.APP_ENV} with Port ${process.env.APP_PORT}`,
  );
}
bootstrap().catch((e) => {
  console.error(e);
});
