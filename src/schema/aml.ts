
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";


export interface MyModelAttribute {
    idempotency_ref: string;
    data_type: string;
    aml: object;
  }

export class AlmInstance extends Model<MyModelAttribute> {
    declare idempotency_ref: string;
    declare data_type: string;
    declare aml: object;
}
AlmInstance.init(
    {
       
      idempotency_ref: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      data_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aml: {
        type: DataTypes.JSON,
        allowNull: false          
      },
    
    },
    {
        sequelize: connectDB(),
        tableName: 'aml'
    }
)

AlmInstance.sync()




