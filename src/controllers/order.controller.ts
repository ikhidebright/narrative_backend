/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderAttributes } from "@/models/order.model";
import { IOrderRepo } from "@/repositories/orders/repo";
import { createOrder } from "@/schema/orders/create";
import express, { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";

@injectable()
export default class OrderController extends BaseController {
  constructor(@inject("IOrderRepo") private repo: IOrderRepo) {
    super();
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const data = req.body as OrderAttributes;
    const order = await this.repo.add(data);
    this.okResponse(res, 200, "", order);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    const id = req.params.id;
    const data = req.body as OrderAttributes;
    const order = await this.repo.update(id, data);
    this.okResponse(res, 200, "", order);
  }

  async deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const id = req.params.id;
    await this.repo.deleteById(id);
    this.okResponse(res, 200);
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const pageData = this.getPageInfo(req);
    const buy_orders = await this.repo.findAll(pageData);
    this.okResponse(res, 200, "", buy_orders);
  }

  registerRoutes(): Router {
    const router = express.Router();
    const w = this.wrap;
    router.post("/", createOrder, w(this.create)); //
    router.get("/", w(this.findAll)); //
    router.put("/:id", w(this.update));
    router.delete("/:id", w(this.deleteOrder));
    return router;
  }
}
