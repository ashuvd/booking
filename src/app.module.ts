import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservationModel } from './reservations/reservation.model';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 6432,
      username: 'postgres',
      password: '12345678',
      database: 'booking',
      models: [ReservationModel],
    }),
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
