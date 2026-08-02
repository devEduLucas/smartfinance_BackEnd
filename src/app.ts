import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { router } from "./routes/index.js";

export const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
