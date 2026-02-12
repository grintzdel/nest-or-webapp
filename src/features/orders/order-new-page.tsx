"use client";

import { useRouter } from "next/navigation";
import { useCreateOrder } from "@nest-or-front/modules/order/react/hooks/mutation/use-create-order";
import { OrderForm } from "@nest-or-front/modules/order/react/components/order-form";
import { PageHeader } from "@nest-or-front/modules/shared/react/components/page-header";
import { BackButton } from "@nest-or-front/modules/shared/react/components/back-button";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

export function OrderNewPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const createMutation = useCreateOrder();

  return (
    <div>
      <BackButton href="/orders" label="Retour aux commandes" />
      <PageHeader title="Nouvelle commande" />
      <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
        <OrderForm
          isPending={createMutation.isPending}
          onSubmit={(data) => {
            createMutation.mutate(data, {
              onSuccess: () => {
                showToast("Commande creee !", "success");
                router.push("/orders");
              },
            });
          }}
        />
      </div>
    </div>
  );
}
