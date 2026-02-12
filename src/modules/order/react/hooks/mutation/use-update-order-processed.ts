import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

export function useUpdateOrderProcessed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: OrderDomainModel.UpdateOrderProcessedDto;
    }) => app.dependencies.orderGateway.updateOrderProcessed(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["listOrders"] });
      queryClient.invalidateQueries({ queryKey: ["getOrderById", id] });
    },
  });
}
