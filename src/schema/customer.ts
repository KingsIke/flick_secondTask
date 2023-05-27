
import { Model, DataTypes } from "sequelize";
import { connectDB } from "../config/db";

export interface ICustomers {
    id: string;
    phone_number: string;
    full_name: string;
    bvn?: string;
    nin?: string;
    tracking_code?: string;
    country:string;
    reg_no?: string
}

export class  CustomerInstance extends Model<ICustomers> {
    declare id: string;
    declare phone_number:string;
    declare full_name: string;
    declare bvn: string;
    declare nin: string;
    declare tracking_code: string;
    declare country:string;
    declare reg_no: string
} 

CustomerInstance.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        phone_number:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'Phone Number is required'
                },
                notEmpty:{
                    msg: 'Phone Number is required'
                }
            }
        },
        full_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg: 'Full Name is required'
                },
                notEmpty:{
                    msg: 'Full Name is required'
                }
            }
        },
        bvn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tracking_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                customValidator: (value: any) => {
                  const enums = ["NG", "RW"]; // to be changed to small letter
                  if (!enums.includes(value)) {
                    throw new Error("value should be a Nigerian or a Rwanda");
                  }
                },
              },
        },
        reg_no: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    },
    {
        sequelize: connectDB(),
        tableName: 'customers'
    }
)

CustomerInstance.sync()