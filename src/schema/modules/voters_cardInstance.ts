import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IVoteInstance {
    id: string;
    voterInstanceId: string;
    data: object;
  
}


export class ResponseInstance extends Model<IVoteInstance> {
    declare  id: string;
     declare voterInstanceId: string;
    declare  data: object
   }

ResponseInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  voterInstanceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  }
},
{
    sequelize: connectDB(),
    tableName: 'VoterResponse',
  }
  );
ResponseInstance.sync()
