import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";

import configs from "./configs";
import { connectDB } from "./lib/connect-db";
import { logger } from "./lib/logger";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
// routers
import { authRouter } from "./routers/auth.router";
import { storageRouter } from "./routers/storage.router";
import { categoryRouter } from "./routers/category.router";
import { collectionRouter } from "./routers/collection.router";
import { sizeRouter } from "./routers/size.router";
import { variantRouter } from "./routers/variant.router";
import { productRouter } from "./routers/product.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

// Custom Middlewares
app.use(loggerMiddleware);
app.use(authMiddleware);

app.get("/check-health", (req, res) => {
  res.send("OK");
});

app.use("/api/auth", authRouter);
app.use("/api/storage", storageRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/collections", collectionRouter);
app.use("/api/sizes", sizeRouter);
app.use("/api/variants", variantRouter);
app.use("/api/products", productRouter);

// Error Handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start Server
app.listen(configs.port, async () => {
  await connectDB(configs.dbUrl!);
  logger.info(`Server started on port ${configs.port}`);
});
