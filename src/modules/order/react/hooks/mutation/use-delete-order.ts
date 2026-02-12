import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => app.dependencies.orderGateway.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listOrders"] });
    },
  });
}
