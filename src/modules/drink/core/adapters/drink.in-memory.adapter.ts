import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";
import { DrinkSizeEnum } from "@nest-or-front/modules/drink/core/enums/drink-size.enum";
import { IDrinkPort } from "@nest-or-front/modules/drink/core/port/drink.port";

export class DrinkInMemoryAdapter implements IDrinkPort {
  private drinks: DrinkDomainModel.DrinkDto[] = [
    {
      id: 1,
      name: "Coca-Cola",
      price: 3,
      size: DrinkSizeEnum.LARGE,
      withAlcohol: false,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      name: "Biere Artisanale",
      price: 5,
      size: DrinkSizeEnum.EXTRA_LARGE,
      withAlcohol: true,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];
  private nextId = 3;

  async listDrinks(): Promise<DrinkDomainModel.DrinkDto[]> {
    return [...this.drinks];
  }

  async getDrinkById(id: number): Promise<DrinkDomainModel.DrinkDto> {
    const drink = this.drinks.find((d) => d.id === id);
    if (!drink) throw new Error(`Drink ${id} not found`);
    return drink;
  }

  async createDrink(
    dto: DrinkDomainModel.CreateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto> {
    const now = new Date();
    const drink = { ...dto, id: this.nextId++, createdAt: now, updatedAt: now, deletedAt: null };
    this.drinks.push(drink);
    return drink;
  }

  async updateDrink(
    id: number,
    dto: DrinkDomainModel.UpdateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto> {
    const index = this.drinks.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Drink ${id} not found`);
    this.drinks[index] = { ...this.drinks[index], ...dto, id, updatedAt: new Date() };
    return this.drinks[index];
  }

  async deleteDrink(id: number): Promise<{ message: string }> {
    this.drinks = this.drinks.filter((d) => d.id !== id);
    return { message: `Drink ${id} deleted` };
  }

  async filterDrinks(
    filters: DrinkDomainModel.DrinkFiltersDto
  ): Promise<DrinkDomainModel.DrinkDto[]> {
    let result = [...this.drinks];
    if (filters.name != null) {
      const q = filters.name.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    if (filters.available != null) {
      result = result.filter((d) => d.available === filters.available);
    }
    if (filters.withAlcohol != null) {
      result = result.filter((d) => d.withAlcohol === filters.withAlcohol);
    }
    if (filters.size != null) {
      const q = filters.size.toLowerCase();
      result = result.filter((d) => d.size.toLowerCase().includes(q));
    }
    return result;
  }
}
