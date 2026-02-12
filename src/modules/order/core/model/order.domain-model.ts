export namespace OrderDomainModel {
  export type OrderDto = {
    id: number;
    pizzas: number[];
    drinks: number[];
    desserts: number[];
    totalPrice: number;
    processed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Nullable<Date>;
  };

  export type CreateOrderDto = {
    pizzas: number[];
    drinks: number[];
    desserts: number[];
  };

  export type UpdateOrderDto = CreateOrderDto;

  export type UpdateOrderProcessedDto = {
    processed: boolean;
  };

  export type OrderFiltersDto = {
    processed?: Nullable<boolean>;
  };
}
