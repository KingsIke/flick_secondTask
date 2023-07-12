import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface IBankInstance {
    id: string;
    bankInstanceId: object;
    data: object;
  
}


export class BankIdentityInstance extends Model<IBankInstance> {
    declare  id: string;
     declare bankInstanceId: object;
    declare  data: object
   }

   BankIdentityInstance.init (
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
  BankIdentityInstance.sync()
