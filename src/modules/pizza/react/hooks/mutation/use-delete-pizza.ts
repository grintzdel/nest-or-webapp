import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";

export function useDeletePizza() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => app.dependencies.pizzaGateway.deletePizza(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listPizzas"] });
    },
  });
}
