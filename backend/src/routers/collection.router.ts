import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth, authorizedFor } from "../middlewares/auth.middleware";
import { collectionController } from "../controllers/collection.controller";
const router = express.Router();

router.get("/", tryCatch(collectionController.getCollections));
router.post(
  "/",
  withAuth,
  authorizedFor("admin"),
  tryCatch(collectionController.createCollection)
);
router.get("/:id", tryCatch(collectionController.getCollection));
router.put(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(collectionController.updateCollection)
);
router.delete(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(collectionController.deleteCollection)
);

export { router as collectionRouter };
