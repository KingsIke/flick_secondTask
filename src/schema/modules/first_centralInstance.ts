import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IFirstCentralInstance {
    id: string;
    creditfirstInstanceId: object;
    data: object;
  
}


export class FirstCentralIdentityInstance extends Model<IFirstCentralInstance> {
    declare  id: string;
     declare creditfirstInstanceId: object;
    declare  data: object
   }

   FirstCentralIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  creditfirstInstanceId: {
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
    tableName: 'CreditCentralResponse',
  }
  );
  FirstCentralIdentityInstance.sync()
