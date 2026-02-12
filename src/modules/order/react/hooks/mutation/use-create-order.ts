import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderDomainModel.CreateOrderDto) =>
      app.dependencies.orderGateway.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listOrders"] });
    },
  });
}
