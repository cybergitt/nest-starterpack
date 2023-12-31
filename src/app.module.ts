import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import databaseConfig from '@infrastructure/config/database.config';
import authConfig from '@infrastructure/config/auth.config';
import appConfig from '@infrastructure/config/app.config';
import mailConfig from '@infrastructure/config/mail.config';
import fileConfig from '@infrastructure/config/file.config';
import googleConfig from '@infrastructure/config/google.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@infrastructure/database/typeorm-config.service';
import { PostsModule } from './modules/posts/posts.module';
import { HomeModule } from './modules/home/home.module';
// import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AllConfigType } from '@infrastructure/config/config.type';
import { MailModule } from './modules/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from '@modules/mail/mail-config.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        mailConfig,
        fileConfig,
        googleConfig,
      ],
      envFilePath: ['.env.development'], // set multiple env paths if needed
    }),
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return [configService.get('app.headerLanguage')];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    HomeModule,
    MailModule,
    AuthModule,
  ],
})
export class AppModule {}
