import { useQuery } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export function useListDrinks() {
  return useQuery<DrinkDomainModel.DrinkDto[]>({
    queryKey: ["listDrinks"],
    queryFn: () => app.dependencies.drinkGateway.listDrinks(),
  });
}
