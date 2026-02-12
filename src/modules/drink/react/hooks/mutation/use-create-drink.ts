import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export function useCreateDrink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DrinkDomainModel.CreateDrinkDto) =>
      app.dependencies.drinkGateway.createDrink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDrinks"] });
    },
  });
}
