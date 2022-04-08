import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class NewTodoItemDto {
  @IsString()
  @ApiProperty({
    description: 'id of the list item',
    default: '1',
  })
  readonly id: string;

  @IsString()
  @ApiProperty({
    description: 'Title of the todo item',
    default: 'Default title',
  })
  readonly title: string;

  @IsString()
  @ApiProperty({
    description: 'Optional description for he item',
    default: 'Description',
  })
  readonly description: string;

  @IsBoolean()
  @ApiProperty({
    description: 'boolean if task is done',
    default: false,
  })
  readonly isDone: boolean;
}
