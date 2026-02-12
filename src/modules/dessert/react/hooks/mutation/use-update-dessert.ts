import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export function useUpdateDessert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: DessertDomainModel.UpdateDessertDto;
    }) => app.dependencies.dessertGateway.updateDessert(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["listDesserts"] });
      queryClient.invalidateQueries({ queryKey: ["getDessertById", id] });
    },
  });
}
