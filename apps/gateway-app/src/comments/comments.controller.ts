import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

// TODO: handle rpc exceptions
@ApiTags('Comments')
@ApiSecurity('jwt')
@Controller('comments')
export class CommentsController {
  constructor(@Inject('COMMENTS_SERVICE') private client: ClientProxy) {}

  @ApiOperation({ summary: "get list of user's comments" })
  @UseGuards(AuthGuard)
  @Get()
  getComments(@Request() req): Observable<Comment[]> {
    const pattern = { cmd: 'find' };
    return this.client.send<Comment[]>(pattern, req.user.id);
  }

  @ApiOperation({ summary: 'create comment' })
  @UseGuards(AuthGuard)
  @Post()
  createComment(
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ): Observable<any> {
    const pattern = { cmd: 'add' };
    return this.client.send<any>(pattern, {
      ...createCommentDto,
      authorId: req.user.id,
      authorName: req.user.name,
    });
  }

  @ApiOperation({ summary: 'update comment' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateComment(
    @Request() req,
    @Param() params: any,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Observable<any> {
    const pattern = { cmd: 'change' };
    return this.client.send<any>(pattern, {
      ...updateCommentDto,
      id: params.id,
      authorId: req.user.id,
    });
  }

  @ApiOperation({ summary: 'delete comment' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(@Param() params: any): Observable<void> {
    const pattern = { cmd: 'delete' };
    return this.client.send<void>(pattern, params.id);
  }
}
