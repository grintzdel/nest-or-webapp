import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

export interface IDrinkPort {
  listDrinks(): Promise<DrinkDomainModel.DrinkDto[]>;
  getDrinkById(id: number): Promise<DrinkDomainModel.DrinkDto>;
  createDrink(
    data: DrinkDomainModel.CreateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto>;
  updateDrink(
    id: number,
    data: DrinkDomainModel.UpdateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto>;
  deleteDrink(id: number): Promise<{ message: string }>;
  filterDrinks(
    filters: DrinkDomainModel.DrinkFiltersDto
  ): Promise<DrinkDomainModel.DrinkDto[]>;
}
