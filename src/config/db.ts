
import { Sequelize } from 'sequelize';

export const db = new Sequelize("osyter", "postgres", "453622", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});


export function connectDB(): Sequelize {
  try {
    //  db.drop();

    // console.log('Database dropped successfully');
    db.authenticate();
    db.sync();
    console.log("Connection has been established successfully.");
    return db;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}
