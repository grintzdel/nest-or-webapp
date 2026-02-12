import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useListOrders() {
  return useQuery<OrderDomainModel.OrderDto[]>({
    queryKey: ["listOrders"],
    queryFn: () => app.dependencies.orderGateway.listOrders(),
  });
}
