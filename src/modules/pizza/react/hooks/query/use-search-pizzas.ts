import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useSearchPizzas(ingredients: string[]) {
  return useQuery<PizzaDomainModel.PizzaDto[]>({
    queryKey: ["searchPizzas", ingredients],
    queryFn: () =>
      app.dependencies.pizzaGateway.searchByIngredients(ingredients),
    enabled: ingredients.length > 0,
  });
}
