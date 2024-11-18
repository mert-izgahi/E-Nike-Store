import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth, authorizedFor } from "../middlewares/auth.middleware";

import { sizeController } from "../controllers/size.controller";

const router = express.Router();

router.get("/", tryCatch(sizeController.getSizes));
router.post(
  "/",
  withAuth,
  authorizedFor("admin"),
  tryCatch(sizeController.createSize)
);
router.get("/:id", tryCatch(sizeController.getSize));
router.put(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(sizeController.updateSize)
);
router.delete(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(sizeController.deleteSize)
);

export { router as sizeRouter };
