import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservices started!');
  });

  app.listen(3334).then(() => {
    console.log('[Classroom] HTTP started!');
  });
}
bootstrap();
