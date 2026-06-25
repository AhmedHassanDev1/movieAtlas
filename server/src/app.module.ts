import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TitleModule } from './title/title.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { minutes, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import * as Joi from 'joi';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RefreshTokenGuard } from './shared/guard/RefreshTokenGuard.guard';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './shared/guard/JwtAuthGuard.guard';
import { DiscoverModule } from './discover/discover.module';
import { SearchModule } from './search/search.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InteractionModule } from './interaction/interaction.module';

import { HttpExceptionFilter } from './shared/filterException/HTTPExepption';
import { PrismaExceptionFilter } from './shared/filterException/PrismaExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        CACHE_TTL: Joi.number().default(3600),
        CACHE_MAX_SIZE: Joi.number().default(1000),
      }),
    }),
    ScheduleModule.forRoot(),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [{
          ttl: minutes(config.get<number>("TTL") as number),
          limit: config.get<number>("LIMIT") as number,
          
        }],
        errorMessage:"The number of requests is very high, please try again later."

      })
    }),
    AuthModule,
    TitleModule,
    UserModule,
    DiscoverModule,
    SearchModule,
    InteractionModule,
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: RefreshTokenGuard
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },

  ],
})
export class AppModule { }
