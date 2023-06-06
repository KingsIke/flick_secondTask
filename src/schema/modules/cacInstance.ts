import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface ICacInstance {
    id: string;
    cacInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<ICacInstance> {
    declare  id: string;
     declare cacInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cacInstanceId: {
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
    tableName: 'CACResponse',
  }
  );
ResponseInstance.sync()
