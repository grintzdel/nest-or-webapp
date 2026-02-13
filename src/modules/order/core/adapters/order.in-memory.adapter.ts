import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";
import { IOrderPort } from "@nest-or-front/modules/order/core/port/order.port";

export class OrderInMemoryAdapter implements IOrderPort {
  private orders: OrderDomainModel.OrderDto[] = [
    {
      id: 1,
      pizzas: [1],
      drinks: [1],
      desserts: [1],
      totalPrice: 19,
      discountAmount: 0,
      discountPercentage: 0,
      processed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];
  private nextId = 2;

  async listOrders(): Promise<OrderDomainModel.OrderDto[]> {
    return [...this.orders];
  }

  async getOrderById(id: number): Promise<OrderDomainModel.OrderDto> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new Error(`Order ${id} not found`);
    return order;
  }

  async createOrder(
    dto: OrderDomainModel.CreateOrderDto
  ): Promise<OrderDomainModel.OrderDto> {
    const now = new Date();
    const order: OrderDomainModel.OrderDto = {
      ...dto,
      id: this.nextId++,
      totalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0,
      processed: false,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    this.orders.push(order);
    return order;
  }

  async updateOrder(
    id: number,
    dto: OrderDomainModel.UpdateOrderDto
  ): Promise<OrderDomainModel.OrderDto> {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error(`Order ${id} not found`);
    this.orders[index] = { ...this.orders[index], ...dto };
    return this.orders[index];
  }

  async updateOrderProcessed(
    id: number,
    dto: OrderDomainModel.UpdateOrderProcessedDto
  ): Promise<OrderDomainModel.OrderDto> {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error(`Order ${id} not found`);
    this.orders[index] = { ...this.orders[index], processed: dto.processed };
    return this.orders[index];
  }

  async deleteOrder(id: number): Promise<{ message: string }> {
    this.orders = this.orders.filter((o) => o.id !== id);
    return { message: `Order ${id} deleted` };
  }

  async filterOrders(
    filters: OrderDomainModel.OrderFiltersDto
  ): Promise<OrderDomainModel.OrderDto[]> {
    let result = [...this.orders];
    if (filters.processed != null) {
      result = result.filter((o) => o.processed === filters.processed);
    }
    return result;
  }
}
