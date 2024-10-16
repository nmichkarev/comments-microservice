import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentsServiceService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async saveComment(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.save(createCommentDto);
  }

  async updateComment(updateDto: UpdateCommentDto) {
    const { id, authorId, text } = updateDto;
    const comment = await this.commentsRepository.findOneBy({ id });

    if (comment.authorId !== authorId)
      throw new RpcException("User can not edit another's comments");

    const updateObject: Partial<Comment> = {
      text,
      // Name of author can change in main app, so it can be sent to update
      authorName:
        'authorName' in updateDto ? updateDto.authorName : comment.authorName,
    };

    return this.commentsRepository.update(id, updateObject);
  }

  async deleteComment(commentId: number) {
    return this.commentsRepository.delete(commentId);
  }

  async list(authorId: number) {
    return this.commentsRepository.findBy({ authorId });
  }
}
