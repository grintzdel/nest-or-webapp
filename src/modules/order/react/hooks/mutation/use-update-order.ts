import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: OrderDomainModel.UpdateOrderDto;
    }) => app.dependencies.orderGateway.updateOrder(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["listOrders"] });
      queryClient.invalidateQueries({ queryKey: ["getOrderById", id] });
    },
  });
}
