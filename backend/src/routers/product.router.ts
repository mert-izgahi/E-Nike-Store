import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth, authorizedFor } from "../middlewares/auth.middleware";

import { productControllers } from "../controllers/product.controllers";

const router = express.Router();

router.get("/", tryCatch(productControllers.getProducts));
router.get("/:id", tryCatch(productControllers.getProduct));
router.post(
  "/",
  withAuth,
  authorizedFor("admin"),
  tryCatch(productControllers.createProduct)
);
router.put(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(productControllers.updateProduct)
);
router.delete(
  "/:id",
  withAuth,
  authorizedFor("admin"),
  tryCatch(productControllers.deleteProduct)
);

export { router as productRouter };
