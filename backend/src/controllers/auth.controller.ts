import { Request, Response, RequestHandler } from "express";
import { ApiError } from "../lib/api-error";
import mailSender from "../lib/mail";
import { User } from "../models/user.model";
import crypto from "crypto";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw ApiError.duplicatedEmail();
  }

  const newUser = await User.create(req.body);

  const token = await newUser.getSignedJwtToken("1d");

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: {
      token,
    },
  });
};

const signIn: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.invalidCredentials();
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw ApiError.invalidCredentials();
  }
  const token = await user.getSignedJwtToken("1d");

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(201).json({
    status: 201,
    message: "User created successfully",
    data: {
      token,
    },
  });
};

const signOut: RequestHandler = async (req: Request, res: Response) => {
  await res.clearCookie("token");
  res.status(200).json({
    status: 200,
    message: "User signed out successfully",
  });
};

const forgotPassword: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.badRequest("Email not found");
  }

  const token = await user.createPasswordResetToken();
  await user.save();

  await mailSender.sendResetPasswordEmail(email, token);

  res.status(200).json({
    status: 200,
    message: "Email sent successfully",
  });
};

const resetPassword: RequestHandler = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw ApiError.badRequest("Invalid token");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: 200,
    message: "Password reset successfully",
  });
};

const verifyEmail: RequestHandler = async (req: Request, res: Response) => {
  const { token } = req.params;

  const verifyToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verifyToken,
    verifyTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw ApiError.badRequest("Invalid token");
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpires = undefined;

  await user.save();

  res.status(200).json({
    status: 200,
    message: "Email verified successfully",
  });
};

const resendEmail: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw ApiError.badRequest("Email not found");
  }

  const token = await user.createVerifyToken();
  await user.save();

  await mailSender.sendVerificationEmail(email, token);

  res.status(200).json({
    status: 200,
    message: "Email sent successfully",
  });
};
const updatePassword: RequestHandler = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const currentUserId = res.locals.currentUserId;

  const user = await User.findById(currentUserId).select("+password");
  if (!user) {
    throw ApiError.badRequest("Invalid token");
  }

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    throw ApiError.invalidCredentials();
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 200,
    message: "Password updated successfully",
  });
};

const updateMe: RequestHandler = async (req: Request, res: Response) => {
  const currentUserId = res.locals.currentUserId;
  const user = await User.findById(currentUserId);
  if (!user) {
    throw ApiError.badRequest("Invalid token");
  }

  const updatedUser = await User.findByIdAndUpdate(
    currentUserId,
    {
      ...req.body,
    },
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Profile updated successfully",
  });
};

export const getMe: RequestHandler = async (req: Request, res: Response) => {
  const currentUserId = res.locals.currentUserId;
  const user = await User.findById(currentUserId);

  res.status(200).json({
    status: 200,
    data: {
      user,
    },
  });
};

export const authController = {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateMe,
  verifyEmail,
  resendEmail,
  getMe,
};
