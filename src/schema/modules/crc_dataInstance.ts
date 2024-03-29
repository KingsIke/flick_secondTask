import { Model, DataTypes } from "sequelize";
import { connectDB } from "../../config/db";

export interface ICrcInstance {
    id: string;
    creditcrcInstanceId: object;
    data: object;
  
}


export class CRCIdentityInstance extends Model<ICrcInstance> {
    declare  id: string;
     declare creditcrcInstanceId: object;
    declare  data: object
   }

   CRCIdentityInstance.init (
    {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  creditcrcInstanceId: {
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
    tableName: 'CreditCRCResponse',
  }
  );
  CRCIdentityInstance.sync()
