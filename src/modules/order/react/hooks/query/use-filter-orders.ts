import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useFilterOrders(filters: OrderDomainModel.OrderFiltersDto) {
  const hasFilters = Object.values(filters).some((v) => v != null);
  return useQuery<OrderDomainModel.OrderDto[]>({
    queryKey: ["filterOrders", filters],
    queryFn: () => app.dependencies.orderGateway.filterOrders(filters),
    enabled: hasFilters,
  });
}
