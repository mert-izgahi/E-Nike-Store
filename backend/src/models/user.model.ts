import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../configs";
import crypto from "crypto";
import dayjs from "dayjs";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  imageUrl: string;
  status: string;
  role: string;
  isVerified: boolean;
  verifyToken: string | undefined;
  verifyTokenExpires: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  getSignedJwtToken: (expiresIn: string) => Promise<string>;
  matchPassword: (password: string) => Promise<boolean>;
  createPasswordResetToken: () => string;
  createVerifyToken: () => string;
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpires: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
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

userSchema.methods.getSignedJwtToken = async function (expiresIn: string) {
  return await jwt.sign({ id: this._id, role: this.role }, configs.jwtSecret!, {
    expiresIn: expiresIn,
  });
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = dayjs().add(10, "m");
  return resetToken;
};

userSchema.methods.createVerifyToken = function () {
  const verifyToken = crypto.randomBytes(32).toString("hex");
  this.verifyToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");
  this.verifyTokenExpires = dayjs().add(10, "m");
  return verifyToken;
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };
