import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservationModel } from './reservation.model';

@Module({
  imports: [SequelizeModule.forFeature([ReservationModel])],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
