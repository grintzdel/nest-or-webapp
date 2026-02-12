import { DrinkSizeEnum } from "@nest-or-front/modules/drink/core/enums/drink-size.enum";

export namespace DrinkDomainModel {
  export type DrinkDto = {
    id: number;
    name: string;
    price: number;
    size: DrinkSizeEnum;
    withAlcohol: boolean;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Nullable<Date>;
  };

  export type CreateDrinkDto = Omit<DrinkDto, "id" | "createdAt" | "updatedAt" | "deletedAt">;

  export type UpdateDrinkDto = Partial<CreateDrinkDto>;

  export type DrinkFiltersDto = {
    name?: Nullable<string>;
    available?: Nullable<boolean>;
    withAlcohol?: Nullable<boolean>;
    size?: Nullable<string>;
  };
}
