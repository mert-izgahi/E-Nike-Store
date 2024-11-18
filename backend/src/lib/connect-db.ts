import mongoose from "mongoose";
import { logger } from "./logger";

export const connectDB = async (connectionString: string) => {
  try {
    const conn = await mongoose.connect(connectionString);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
