import { Order, OrderAttributes } from "@/models/order.model";
import { PageData, Paginated } from "@/types/pagination";
import { paginate } from "@/utils/models";
import { injectable } from "tsyringe";

export interface IOrderRepo {
  findById(id: string): Promise<Order>;
  findAll(pageData: PageData): Promise<Paginated<Order>>;
  deleteById(id: string): Promise<void>;
  add(data: OrderAttributes): Promise<Order>;
  update(id: string, data: OrderAttributes): Promise<Order>;
}

@injectable()
export class OrderRepo implements IOrderRepo {
  constructor(private model: typeof Order) {}

  private baseQuery() {
    return {
      where: {} as any,
      include: [] as any[],
    };
  }

  findById(id: string): Promise<Order> {
    return this.model.findByPk(id);
  }

  async findAll(pageData: PageData): Promise<Paginated<Order>> {
    const query = this.baseQuery();
    return paginate<Order>(this.model, query, pageData);
  }

  async deleteById(id: string): Promise<void> {
    const query = this.baseQuery();
    query.where.id = id;
    await this.model.destroy(query);
  }

  async add(data: OrderAttributes): Promise<Order> {
    const Order = await this.model.create(data);
    return Order;
  }

  async update(id: string, data: OrderAttributes): Promise<Order> {
    const Order = await this.findById(id);
    Object.entries(data).forEach(([key, val]: any[]) => {
      Order.set(key, val);
    });
    return await Order.save();
  }
}
