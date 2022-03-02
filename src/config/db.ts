import config from './index';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export default new Sequelize({
  dialect: 'postgres',
  ...config.db,
} as SequelizeOptions);
