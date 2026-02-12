import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useGetOrderById(id: number) {
  return useQuery<OrderDomainModel.OrderDto>({
    queryKey: ["getOrderById", id],
    queryFn: () => app.dependencies.orderGateway.getOrderById(id),
    enabled: !!id,
  });
}
