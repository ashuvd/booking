import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReservationModel } from './reservation.model';
import { Op } from 'sequelize';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(ReservationModel)
    private reservationModel: typeof ReservationModel,
  ) {}
  async findAllByPeriod(
    startTime: Date,
    endTime: Date,
  ): Promise<ReservationModel[]> {
    return this.reservationModel.findAll({
      where: {
        [Op.or]: [
          {
            start_time: {
              [Op.and]: [
                {
                  [Op.lte]: endTime,
                },
                {
                  [Op.gte]: startTime,
                },
              ],
            },
          },
          {
            end_time: {
              [Op.and]: [
                {
                  [Op.lt]: endTime,
                },
                {
                  [Op.gt]: startTime,
                },
              ],
            },
          },
          {
            [Op.and]: [
              {
                start_time: {
                  [Op.lte]: startTime,
                },
              },
              {
                end_time: {
                  [Op.gte]: endTime,
                },
              },
            ],
          },
        ],
      },
    });
  }
  async findAll(): Promise<ReservationModel[]> {
    return this.reservationModel.findAll();
  }
  async create(reservation): Promise<ReservationModel> {
    return this.reservationModel.create(reservation);
  }
  async deleteById(id): Promise<number> {
    return this.reservationModel.destroy({ where: { id } });
  }
}
