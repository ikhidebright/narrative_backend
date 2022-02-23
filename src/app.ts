import "reflect-metadata";

import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { connectModels } from "./models";
import appRouter from "@/router";

import sequelize from "./database";
connectModels(sequelize);
const app = express();

app.use(cors());
app.use(express.json());

app.use(appRouter);

app.use(errorHandler);

export default app;
