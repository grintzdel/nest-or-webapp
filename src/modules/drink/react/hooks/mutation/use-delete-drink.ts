import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";

export function useDeleteDrink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => app.dependencies.drinkGateway.deleteDrink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDrinks"] });
    },
  });
}
