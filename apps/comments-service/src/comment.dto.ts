export class CreateCommentDto {
  authorId: number;
  authorName: string;
  text: string;
}

export class UpdateCommentDto {
  id: number;
  authorId: number;
  text: string;
  authorName?: string;
}
