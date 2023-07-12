import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IVoteInstance {
    id: string;
    voterInstanceId: string;
    data: object;
  
}


export class VoteIdentityInstance extends Model<IVoteInstance> {
    declare  id: string;
     declare voterInstanceId: string;
    declare  data: object
   }

   VoteIdentityInstance.init (
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
  VoteIdentityInstance.sync()
