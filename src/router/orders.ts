import express from "express";
import { appContainer } from "@/tsyringe.container";
import OrdersController from "@/controllers/order.controller";

const ordersCtrl = appContainer.resolve(OrdersController);

const router = express.Router();

router.use("/orders", ordersCtrl.registerRoutes());
export { router as ordersRoute };
