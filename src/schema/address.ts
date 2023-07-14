import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IADDRESS {
  idempotency_ref: string;
  data_type: string;
  data: object;
} 

export class AddressInstance extends Model<IADDRESS> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  data: object
}

AddressInstance.init(
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
    data:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'address',
      }
)
AddressInstance.sync()