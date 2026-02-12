import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export interface IOrderPort {
  listOrders(): Promise<OrderDomainModel.OrderDto[]>;
  getOrderById(id: number): Promise<OrderDomainModel.OrderDto>;
  createOrder(
    data: OrderDomainModel.CreateOrderDto
  ): Promise<OrderDomainModel.OrderDto>;
  updateOrder(
    id: number,
    data: OrderDomainModel.UpdateOrderDto
  ): Promise<OrderDomainModel.OrderDto>;
  updateOrderProcessed(
    id: number,
    data: OrderDomainModel.UpdateOrderProcessedDto
  ): Promise<OrderDomainModel.OrderDto>;
  deleteOrder(id: number): Promise<{ message: string }>;
  filterOrders(
    filters: OrderDomainModel.OrderFiltersDto
  ): Promise<OrderDomainModel.OrderDto[]>;
}
