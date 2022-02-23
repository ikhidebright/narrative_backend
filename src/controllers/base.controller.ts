import { PageData } from "@/types/pagination";
import { Handler, NextFunction, Router, Response, Request } from "express";

export default abstract class BaseController {
  abstract registerRoutes(): Router;

  constructor() {
    this.bindMethods();
  }

  protected bindMethods() {
    const instance = this as any;
    //Get methods
    const proto = Object.getPrototypeOf(instance);
    const methods = [
      ...Object.getOwnPropertyNames(BaseController.prototype),
      ...Object.getOwnPropertyNames(proto),
    ];

    //Bind methods
    for (const method of methods) {
      if (typeof instance[method] === "function") {
        instance[method] = instance[method].bind(this);
      }
    }
  }

  /**
   *
   * @param res
   * @param code defaults to 200
   * @param msg
   * @param data
   * @returns
   * sends an ok response, i.e 200 code by default and success = true
   */
  okResponse(res: Response, code = 200, msg = "", data: any = {}) {
    return res.status(code).json({
      success: true,
      message: msg,
      ...this.spreadPagination(data),
    });
  }

  protected getPageInfo(request: Request): PageData {
    const page =
      (request.query.page as string) || (request.query.p as string) || 1;
    const limit = (request.query.limit as string) || 10;
    return {
      page: Number(page),
      limit: Number(limit),
    };
  }

  private spreadPagination(data: any) {
    if (Array.isArray(data) || !data) return { data };
    const keys = Object.keys(data);
    const isPaged = keys.includes("data") && keys.includes("currentPage");
    return isPaged ? data : { data };
  }
  /**
   *
   * @param res
   * @param code
   * @param msg
   * @param data
   * sends an error response, i.e a response with success = false
   */
  errResponse(res: Response, code: number, msg = "", data: any = {}) {
    return res.status(code).json({
      success: false,
      message: msg,
      data,
    });
  }

  /**
   * Wrap method in an error handler so that controller methods
   * don't need to explicitly worry about error handling
   */
  protected wrap(method: any): Handler {
    const wrapped = async (req: any, res: any, next: any) => {
      try {
        await method(req, res, next);
      } catch (error) {
        next(error);
      }
    };
    return wrapped;
  }
}
