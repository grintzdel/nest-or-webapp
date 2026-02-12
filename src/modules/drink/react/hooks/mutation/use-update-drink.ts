import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export function useUpdateDrink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: DrinkDomainModel.UpdateDrinkDto;
    }) => app.dependencies.drinkGateway.updateDrink(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["listDrinks"] });
      queryClient.invalidateQueries({ queryKey: ["getDrinkById", id] });
    },
  });
}
