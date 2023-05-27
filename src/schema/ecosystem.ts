import { DataTypes, Model, Sequelize } from 'sequelize';
import { connectDB } from "../config/db";

export interface IECOSYSTEM {
  idempotency_ref: string;
  data_type: string;
  ecosystem: object;
} 

export class EcosystemInstance extends Model<IECOSYSTEM> {
 declare  idempotency_ref: string;
  declare data_type: string;
 declare  ecosystem: object
}

EcosystemInstance.init(
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
    ecosystem:{
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
        sequelize: connectDB(),
        tableName: 'ecosystem',
      }
)
EcosystemInstance.sync()