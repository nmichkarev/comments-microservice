import { Module } from '@nestjs/common';
import { CommentsServiceController } from './comments-service.controller';
import { CommentsServiceService } from './comments-service.service';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'comments_db',
      password: 'comments_db',
      database: 'microservices_comments',
      entities: [Comment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentsServiceController],
  providers: [CommentsServiceService],
})
export class CommentsServiceModule {}
