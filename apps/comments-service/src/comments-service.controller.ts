import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommentsServiceService } from './comments-service.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
export class CommentsServiceController {
  constructor(
    private readonly commentsServiceService: CommentsServiceService,
  ) {}

  @MessagePattern({ cmd: 'add' })
  async create(data: CreateCommentDto): Promise<Comment> {
    return this.commentsServiceService.saveComment(data);
  }

  @MessagePattern({ cmd: 'change' })
  async update(data: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentsServiceService.updateComment(data);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(id: number): Promise<DeleteResult> {
    return this.commentsServiceService.deleteComment(id);
  }

  @MessagePattern({ cmd: 'find' })
  async list(authorId: number): Promise<Comment[]> {
    return this.commentsServiceService.list(authorId);
  }
}
