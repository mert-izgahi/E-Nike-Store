import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth } from "../middlewares/auth.middleware";
import { uploadImage } from "../controllers/storage.controller";

const router = express.Router();

router.post("/upload-image", withAuth, tryCatch(uploadImage));
export { router as storageRouter };
