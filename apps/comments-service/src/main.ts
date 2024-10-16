import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CommentsServiceModule } from './comments-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommentsServiceModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 },
    },
  );
  await app.listen();
}
bootstrap();
