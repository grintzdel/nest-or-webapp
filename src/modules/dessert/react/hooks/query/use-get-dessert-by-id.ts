import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export function useGetDessertById(id: number) {
  return useQuery<DessertDomainModel.DessertDto>({
    queryKey: ["getDessertById", id],
    queryFn: () => app.dependencies.dessertGateway.getDessertById(id),
    enabled: !!id,
  });
}
