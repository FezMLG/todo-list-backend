import { IsString } from 'class-validator';
import { INewItem } from 'src/interfaces/todo.interface';

export class NewTodoItemDto implements INewItem {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
