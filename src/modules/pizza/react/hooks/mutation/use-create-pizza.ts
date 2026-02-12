import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useCreatePizza() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PizzaDomainModel.CreatePizzaDto) =>
      app.dependencies.pizzaGateway.createPizza(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listPizzas"] });
    },
  });
}
