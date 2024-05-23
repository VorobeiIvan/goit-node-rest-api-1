import { connect } from "mongoose";
export const connectDb = async () => {
  try {
    await connect(process.env.DB_HOST);
    console.log("Database connection successful");
  } catch {
    (error) => {
      console.log(error);
      process.exit(1);
    };
  }
};
