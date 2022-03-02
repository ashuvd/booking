import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationModel } from './reservation.model';
import { CreateReservationDto } from 'src/@types';
import DateHelper from '../utils/DateHelper';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationModel> {
    const { startTime, endTime } = createReservationDto;
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const reservations = await this.reservationsService.findAllByPeriod(
      startDate,
      endDate,
    );
    if (reservations.length) {
      throw new HttpException('TIME_BUSY', HttpStatus.BAD_REQUEST);
    }
    const timeMap = DateHelper.createTimeMapByDate(startDate);
    let resultStartDateTime = startDate;
    let resultEndDateTime = endDate;
    for (const time of timeMap) {
      if (new Date(time) >= startDate && resultStartDateTime === startDate) {
        resultStartDateTime = time;
      }
      if (new Date(time) >= endDate && resultEndDateTime === endDate) {
        resultEndDateTime = time;
      }
    }
    return this.reservationsService.create({
      start_time: resultStartDateTime,
      end_time: resultEndDateTime,
      booked: true,
    });
  }
  @Get()
  getReservations(): Promise<ReservationModel[]> {
    return this.reservationsService.findAll();
  }
  @Delete(':id')
  deleteReservation(@Param('id') id: string): Promise<number> {
    return this.reservationsService.deleteById(id);
  }
}
