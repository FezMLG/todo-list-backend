import { IsBoolean, IsNumber } from 'class-validator';

export class SetItemStatusDto {
  @IsNumber()
  readonly id: string;

  @IsBoolean()
  readonly isDone: boolean;
}
