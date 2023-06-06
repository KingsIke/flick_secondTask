import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IKarmaInstance {
    id: string;
    karmaInstanceId: object;
    data: object;
  
}


export class ResponseInstance extends Model<IKarmaInstance> {
    declare  id: string;
     declare karmaInstanceId: object;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  karmaInstanceId: {
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
    tableName: 'KarmaResponse',
  }
  );
ResponseInstance.sync()
