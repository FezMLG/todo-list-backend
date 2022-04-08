import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SetItemStatusDto {
  @IsString()
  readonly id: string;

  @IsBoolean()
  readonly isDone: boolean;
}
