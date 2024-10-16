import { ApiProperty } from '@nestjs/swagger';

// To create or update comment only comment's text used. User's data added after authentication process
export class CreateCommentDto {
  @ApiProperty()
  text: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  text: string;
}
