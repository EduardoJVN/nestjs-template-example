import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@tresdoce/nestjs-health';
import { HttpClientModule } from '@tresdoce/nestjs-httpclient';
import { ArchetypeModule } from '@tresdoce/nestjs-archetype';

import { UtilsModule } from './utils/utils.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { config, environments, validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments.env,
      ignoreEnvFile: process.env.IGNORE_ENV_FILE.toLowerCase() === 'true' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    ArchetypeModule,
    HealthModule.register(config()),
    HttpClientModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
