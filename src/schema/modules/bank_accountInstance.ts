import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IBankInstance {
    id: string;
    bankInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<IBankInstance> {
    declare  id: string;
     declare bankInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bankInstanceId: {
    type: DataTypes.JSON,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
{
    sequelize: connectDB(),
    tableName: 'BankResponse',
  }
  );
ResponseInstance.sync()
