import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface INinInstance {
    id: string;
    ninInstanceId: string;
    data: string;
  
}


export class ResponseInstance extends Model<INinInstance> {
    declare  id: string;
     declare ninInstanceId: string;
    declare  data: string
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ninInstanceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
    sequelize: connectDB(),
    tableName: 'NinResponse',
  }
  );
ResponseInstance.sync()
