import "reflect-metadata";

import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { connectModels } from "./models";
import appRouter from "@/router";

import sequelize from "./database";
connectModels(sequelize);
const app = express();

const whitelist = [
  "http://localhost:8080",
  "https://narrativemarket.netlify.app",
];
const corsOptions = {
  origin: function (origin: string, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Blocked!"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(appRouter);

app.use(errorHandler);

export default app;
