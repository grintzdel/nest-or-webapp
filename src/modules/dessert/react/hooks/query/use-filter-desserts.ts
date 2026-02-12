import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export function useFilterDesserts(filters: DessertDomainModel.DessertFiltersDto) {
  const hasFilters = Object.values(filters).some((v) => v !== undefined);
  return useQuery<DessertDomainModel.DessertDto[]>({
    queryKey: ["filterDesserts", filters],
    queryFn: () => app.dependencies.dessertGateway.filterDesserts(filters),
    enabled: hasFilters,
  });
}
