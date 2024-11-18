import express from "express";
import { tryCatch } from "../middlewares/try-catch.middleware";
import { withAuth, authorizedFor } from "../middlewares/auth.middleware";

import { variantController } from "../controllers/variant.controller";

const router = express.Router();

router.get("/", tryCatch(variantController.getVariants));
router.post(
    "/",
    withAuth,
    authorizedFor("admin"),
    tryCatch(variantController.createVariant)
);
router.get("/:id", tryCatch(variantController.getVariant));
router.put(
    "/:id",
    withAuth,
    authorizedFor("admin"),
    tryCatch(variantController.updateVariant)
);
router.delete(
    "/:id",
    withAuth,
    authorizedFor("admin"),
    tryCatch(variantController.deleteVariant)
);

export { router as variantRouter };