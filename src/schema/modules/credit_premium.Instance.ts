import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IPremiumInstance {
    id: string;
    creditpremiumInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<IPremiumInstance> {
    declare  id: string;
     declare creditpremiumInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  creditpremiumInstanceId: {
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
    tableName: 'PremiumResponse',
  }
  );
ResponseInstance.sync()
