import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENTS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
