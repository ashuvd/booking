import { IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
