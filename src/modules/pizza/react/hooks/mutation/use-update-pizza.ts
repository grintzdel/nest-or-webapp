import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useUpdatePizza() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: PizzaDomainModel.UpdatePizzaDto;
    }) => app.dependencies.pizzaGateway.updatePizza(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["listPizzas"] });
      queryClient.invalidateQueries({ queryKey: ["getPizzaById", id] });
    },
  });
}
