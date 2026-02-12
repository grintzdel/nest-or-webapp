import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export function useListDesserts() {
  return useQuery<DessertDomainModel.DessertDto[]>({
    queryKey: ["listDesserts"],
    queryFn: () => app.dependencies.dessertGateway.listDesserts(),
  });
}
