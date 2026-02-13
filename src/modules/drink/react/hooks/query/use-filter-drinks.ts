import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export function useFilterDrinks(filters: DrinkDomainModel.DrinkFiltersDto) {
  const hasFilters = Object.values(filters).some((v) => v != null);
  return useQuery<DrinkDomainModel.DrinkDto[]>({
    queryKey: ["filterDrinks", filters],
    queryFn: () => app.dependencies.drinkGateway.filterDrinks(filters),
    enabled: hasFilters,
  });
}
