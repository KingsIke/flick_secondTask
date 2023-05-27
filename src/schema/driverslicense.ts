import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IDRIVER {
  idempotency_ref: string;
  data_type: string;
  drivers_license: object;
} 

export class DriverInstance extends Model<IDRIVER> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  drivers_license: object
}

DriverInstance.init(
  {
    idempotency_ref:{
    
              type: DataTypes.UUID,
              primaryKey: true,
              defaultValue: DataTypes.UUIDV4,
              allowNull: false,
            },
    data_type:{
      type: DataTypes.STRING,
            allowNull: false,
    },
    drivers_license:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'driverlicense',
      }
)
DriverInstance.sync()