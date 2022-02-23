import express from "express";
import { ordersRoute } from "./orders";

const router = express.Router();

router.use("/api/v1", ordersRoute);

export default router;
