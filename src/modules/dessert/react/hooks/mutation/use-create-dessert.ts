import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export function useCreateDessert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DessertDomainModel.CreateDessertDto) =>
      app.dependencies.dessertGateway.createDessert(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDesserts"] });
    },
  });
}
