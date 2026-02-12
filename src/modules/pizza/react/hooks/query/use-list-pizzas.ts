import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useListPizzas() {
  return useQuery<PizzaDomainModel.PizzaDto[]>({
    queryKey: ["listPizzas"],
    queryFn: () => app.dependencies.pizzaGateway.listPizzas(),
  });
}
