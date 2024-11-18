import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth } from "../middlewares/auth.middleware";
import { authController } from "../controllers/auth.controller";


const router = express.Router();

router.post("/sign-up", tryCatch(authController.signUp));
router.post("/sign-in", tryCatch(authController.signIn));
router.post("/sign-out", tryCatch(authController.signOut));
router.post("/forgot-password", tryCatch(authController.forgotPassword));
router.post("/reset-password/:token", tryCatch(authController.resetPassword));
router.post("/verify-account/:token", tryCatch(authController.verifyEmail));
router.post("/resend-email", tryCatch(authController.resendEmail));
router.post("/verify-email", tryCatch(authController.verifyEmail));
router.post("/resend-email", tryCatch(authController.resendEmail));
router.get("/me", withAuth, tryCatch(authController.getMe));
router.put(
  "/update-password",
  withAuth,
  tryCatch(authController.updatePassword)
);
router.put("/me", withAuth, tryCatch(authController.updateMe));
export { router as authRouter };
