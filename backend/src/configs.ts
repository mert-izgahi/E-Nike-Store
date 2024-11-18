import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  cookieSecret: process.env.COOKIE_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
