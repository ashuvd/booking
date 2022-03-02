import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'reservations',
})
export class ReservationModel extends Model<ReservationModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_time: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  booked: boolean;
}
