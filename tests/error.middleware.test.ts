import APIException from "../src/exceptions/api.exception";
import { errorHandler } from "../src/middlewares/error.middleware";

const ResponseMock: any = () => {
  return {
    code: 0,
    msg: "",
    status(code: number) {
      this.code = code;
      return this;
    },
    send(msg: any) {
      this.msg = msg;
      return this;
    },
  };
};
const handler = (err: Error | APIException, res: any) => {
  return errorHandler(err, {} as any, res as any, {} as any);
};
describe("Test error handler", () => {
  let res: any;
  beforeEach(() => {
    res = ResponseMock();
  });
  test("Handler sends APIException status code and message", () => {
    const code = 500;
    const message = "hello kitty";
    const exception = new APIException(code, message);
    handler(exception, res);

    expect(res.code).toBe(code);
    expect(res.msg.message).toBe(message);
  });
  test("Handler falls back to Error message and 500 code on non APIExceptions", () => {
    const message = "How are you";
    const exception = new Error(message);
    handler(exception, res);
    expect(res.code).toBe(500);
    expect(res.msg.message).toBe(message);
  });
});
