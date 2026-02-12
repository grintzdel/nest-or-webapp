import { useMutation, useQueryClient } from "@tanstack/react-query";
import { app } from "@nest-or-front/modules/app/main";

export function useDeleteDessert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      app.dependencies.dessertGateway.deleteDessert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listDesserts"] });
    },
  });
}
