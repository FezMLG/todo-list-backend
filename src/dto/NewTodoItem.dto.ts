import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class NewTodoItemDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly isDone: boolean;
}
