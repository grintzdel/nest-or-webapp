import { AxiosInstance } from "axios";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";
import { IOrderPort } from "@nest-or-front/modules/order/core/port/order.port";

export class OrderHttpAdapter implements IOrderPort {
  constructor(private api: AxiosInstance) {}

  async listOrders(): Promise<OrderDomainModel.OrderDto[]> {
    try {
      const res =
        await this.api.get<OrderDomainModel.OrderDto[]>("/orders");
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to list orders : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async getOrderById(id: number): Promise<OrderDomainModel.OrderDto> {
    try {
      const res = await this.api.get<OrderDomainModel.OrderDto>(
        `/orders/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to find order for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async createOrder(
    dto: OrderDomainModel.CreateOrderDto
  ): Promise<OrderDomainModel.OrderDto> {
    try {
      const res = await this.api.post<OrderDomainModel.OrderDto>(
        "/orders",
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to create order : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async updateOrder(
    id: number,
    dto: OrderDomainModel.UpdateOrderDto
  ): Promise<OrderDomainModel.OrderDto> {
    try {
      const res = await this.api.put<OrderDomainModel.OrderDto>(
        `/orders/${id}`,
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to update order for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async updateOrderProcessed(
    id: number,
    dto: OrderDomainModel.UpdateOrderProcessedDto
  ): Promise<OrderDomainModel.OrderDto> {
    try {
      const res = await this.api.patch<OrderDomainModel.OrderDto>(
        `/orders/${id}/processed`,
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to update order processed for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async deleteOrder(id: number): Promise<{ message: string }> {
    try {
      const res = await this.api.delete<{ message: string }>(
        `/orders/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to delete order for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async filterOrders(
    filters: OrderDomainModel.OrderFiltersDto
  ): Promise<OrderDomainModel.OrderDto[]> {
    try {
      const params: Record<string, string> = {};
      if (filters.processed != null) params.processed = String(filters.processed);
      const res = await this.api.get<OrderDomainModel.OrderDto[]>("/orders", { params });
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to filter orders : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
