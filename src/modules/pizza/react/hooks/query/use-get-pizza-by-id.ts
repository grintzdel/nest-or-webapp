import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useGetPizzaById(id: number) {
  return useQuery<PizzaDomainModel.PizzaDto>({
    queryKey: ["getPizzaById", id],
    queryFn: () => app.dependencies.pizzaGateway.getPizzaById(id),
    enabled: !!id,
  });
}
