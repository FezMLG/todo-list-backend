import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class SetItemStatusDto {
  @IsString()
  @ApiProperty({
    description: 'id of the list item',
    default: '1',
  })
  readonly id: string;

  @IsBoolean()
  @ApiProperty({
    description: 'id of the list item',
    default: '1',
  })
  readonly isDone: boolean;
}
