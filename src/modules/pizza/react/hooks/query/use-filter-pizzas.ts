import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export function useFilterPizzas(filters: PizzaDomainModel.PizzaFiltersDto) {
  const hasFilters = Object.values(filters).some((v) => v !== undefined);
  return useQuery<PizzaDomainModel.PizzaDto[]>({
    queryKey: ["filterPizzas", filters],
    queryFn: () => app.dependencies.pizzaGateway.filterPizzas(filters),
    enabled: hasFilters,
  });
}
