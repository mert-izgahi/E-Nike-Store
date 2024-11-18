# Init Server

```bash
tsc --init
npm init -y
```

```bash
tsc --init
npm i -D typescript
npm i -D @types/node
npm i express
npm i @types/express
npm i ts-node-dev --save-dev
npm i bcrypt
npm i @types/bcrypt
npm i cookie-parser
npm i @types/cookie-parser
npm i cors
npm i @types/cors
npm i dotenv
npm i @types/dotenv
npm i express-fileupload
npm i @types/express-fileupload
npm i jsonwebtoken
npm i @types/jsonwebtoken
npm i mongoose
npm i @types/mongoose
npm i pino
npm i pino-pretty
npm i @faker-js/faker --save-dev
npm i dayjs --save
npm i cloudinary
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

```bash
npx eslint --init
```

# TODO: ts config file

# Dotenv

```ts
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
};
```

# Logger

```ts
import pino from "pino";
import dayjs from "dayjs";

const loggerInstance = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
      ignore: "pid,hostname",
    },
  },
  base: {
    pid: false,
  },
  // level: process.env.NODE_ENV === "production" ? "info" : "debug",
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DD HH:mm:ss")}"`,
});

export { loggerInstance as logger };
```

# Connect to DB

```ts
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
```

```ts
app.listen(configs.port, async () => {
  await connectDB(configs.dbUrl!);
  logger.info(`Server started on port ${configs.port}`);
});
```

# User Model

```ts
// ./src/models/user.model.ts
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "@/configs";

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    imageUrl: string;
    status: string;
    role: string;
    getSignedJwtToken: () => Promise<string>;
    matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      min: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = async function () {
  return await jwt.sign({ id: this._id }, configs.jwtSecret!, {
    expiresIn: configs.jwtExpiresIn,
  });
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };

```

# Auth Controllers

```ts
import { Request, Response, RequestHandler } from "express";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  res.send("signUp");
};

const signIn: RequestHandler = async (req: Request, res: Response) => {
  res.send("signIn");
};

const signOut: RequestHandler = async (req: Request, res: Response) => {
  res.send("signOut");
};

const refresh: RequestHandler = async (req: Request, res: Response) => {
  res.send("refresh");
};

const forgotPassword: RequestHandler = async (req: Request, res: Response) => {
  res.send("forgotPassword");
};

const resetPassword: RequestHandler = async (req: Request, res: Response) => {
  res.send("resetPassword");
};

const updatePassword: RequestHandler = async (req: Request, res: Response) => {
  res.send("updatePassword");
};

const updateProfile: RequestHandler = async (req: Request, res: Response) => {
  res.send("updateProfile");
};

const verifyEmail: RequestHandler = async (req: Request, res: Response) => {
  res.send("verifyEmail");
};

const resendEmail: RequestHandler = async (req: Request, res: Response) => {
  res.send("resendEmail");
};

export const authController = {
  signUp,
  signIn,
  signOut,
  refresh,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyEmail,
  resendEmail,
};
```

# Auth Routes

```ts
// ./src/routers/auth.router.ts
import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/sign-out", authController.signOut);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/update-password", authController.updatePassword);
router.post("/update-profile", authController.updateProfile);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-email", authController.resendEmail);

export { router as authRouter };
```

# Logger Middeware

```ts
// ./src/middlewares/logger.middleware.ts
import { logger } from "../lib/logger";
import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;
  logger.info(`${method} ${url}`);
  next();
};
```

# Not Found Middleware

```ts
// ./src/middlewares/not-found.middleware.ts
import { Request, Response } from "express";

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found", title: "NotFound" });
};
```

# Api Error Class

```ts
// ./src/lib/api-error.ts
export class ApiError extends Error {
  status: number;
  title: string;
  constructor(status: number, message: string, title: string) {
    super(message);
    this.title = title;
    this.status = status;
  }

  static notFound() {
    return new ApiError(404, "Route not found", "NotFound");
  }
}
```

# Error Middleware

```ts
// ./src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";
import { ApiError } from "../lib/api-error";

export const errorHandlerMiddleware = (
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  if (error instanceof ApiError) {
    return next(
      res.status(error.status).json({
        status: error.status,
        message: error.message,
        title: error.title,
      })
    );
  }

  return next(
    res.status(500).json({
      status: 500,
      message: "Something went wrong!",
      title: "ERROR",
    })
  );
};
```

# Refactoring

```ts
// ./src/middlewares/not-found.middleware.ts
import { Request, Response } from "express";
import { ApiError } from "../lib/api-error";
export const notFoundMiddleware = (req: Request, res: Response) => {
  //res.status(404).json({ message: "Route not found", title: "NotFound" });
  const error = ApiError.notFound();
  res.status(error.status).json({
    status: error.status,
    message: error.message,
    title: error.title,
  });
};
```

# Try Catch Middleware

```ts
// ./src/middlewares/try-catch.middleware.ts
import { Request, Response, NextFunction } from "express";

export const tryCatch = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((e: any) => {
      next(e);
    });
  };
};
```


# Sign Up Controller

```ts
// ./src/controllers/auth.controller.ts
export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw ApiError.duplicatedEmail();
  }

  const newUser = await User.create(req.body);

  const token = await newUser.getSignedJwtToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: {
      token,
    },
  });
};
```


# Auth Middleware

```ts
// ./src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import configs from "../configs";
import { ApiError } from "../lib/api-error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req?.cookies;

  if (!accessToken) {
    return next();
  }

  const decoded = jwt.verify(accessToken, configs.jwtSecret!);

  if (!decoded) {
    return next();
  }

  const currentUserId = (decoded as any)._id;
  const currentUserRole = (decoded as any).role;
  if (!currentUserId) {
    return next();
  }

  res.locals.currentUserId = currentUserId;
  res.locals.currentUserRole = currentUserRole;

  return next();
};

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const { currentUserId } = res.locals;
  if (!currentUserId) {
    return next(ApiError.invalidCredentials());
  }

  return next();
};

export const authorizedFor = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { currentUserRole } = res.locals;
    if (!currentUserRole) {
      return next(ApiError.invalidCredentials());
    }

    if (!roles.includes(currentUserRole)) {
      return next(ApiError.invalidCredentials());
    }

    return next();
  };
};

```

# Mail Sender

```ts
// ./src/lib/mail.ts
import configs from "../configs";
import nodemailer from "nodemailer";

class MailSender {
  private transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configs.mailHost,
      port: configs.mailPort,
      auth: {
        user: configs.mailUser,
        pass: configs.mailPassword,
      },
    } as nodemailer.TransportOptions);
  }

  async sendTestEmail(email: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Test Email",
      text: "This is a test email",
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendVerificationEmail(email: string, token: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Verify Email",
      text: `Click this link to verify your email: ${configs.FRONTEND_URL}/auth/verify-account/${token}`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const mailOptions = {
      from: configs.mailFrom,
      to: email,
      subject: "Reset Password",
      text: `Click this link to reset your password: ${configs.FRONTEND_URL}/auth/reset-password/${token}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

const mailSender = new MailSender();

export default mailSender;

```