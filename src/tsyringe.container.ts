// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { container } from "tsyringe";
import { Order } from "./models/order.model";
import { OrderRepo } from "./repositories/orders/repo";

container.register("IOrderRepo", {
  useFactory: (_) => new OrderRepo(Order),
});

export { container as appContainer };
