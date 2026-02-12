import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export function useGetDrinkById(id: number) {
  return useQuery<DrinkDomainModel.DrinkDto>({
    queryKey: ["getDrinkById", id],
    queryFn: () => app.dependencies.drinkGateway.getDrinkById(id),
    enabled: !!id,
  });
}
