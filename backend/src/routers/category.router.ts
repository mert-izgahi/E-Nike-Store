import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth, authorizedFor } from "../middlewares/auth.middleware";
import { categoryControllers } from "../controllers/category.controllers";
const router = express.Router();

router.get("/", tryCatch(categoryControllers.getCategories));

router.post(
  "/",
  withAuth,
  authorizedFor("admin"),
  tryCatch(categoryControllers.createCategory)
);

router.get("/parents", tryCatch(categoryControllers.getParentCategories));

router.get("/:id", tryCatch(categoryControllers.getCategory));

router.put(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(categoryControllers.updateCategory)
);

router.delete(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(categoryControllers.deleteCategory)
);
export { router as categoryRouter };
