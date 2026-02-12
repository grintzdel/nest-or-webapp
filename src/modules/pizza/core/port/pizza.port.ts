import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

export interface IPizzaPort {
  listPizzas(): Promise<PizzaDomainModel.PizzaDto[]>;
  getPizzaById(id: number): Promise<PizzaDomainModel.PizzaDto>;
  createPizza(
    data: PizzaDomainModel.CreatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto>;
  updatePizza(
    id: number,
    data: PizzaDomainModel.UpdatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto>;
  deletePizza(id: number): Promise<{ message: string }>;
  searchByIngredients(
    ingredients: string[]
  ): Promise<PizzaDomainModel.PizzaDto[]>;
  filterPizzas(
    filters: PizzaDomainModel.PizzaFiltersDto
  ): Promise<PizzaDomainModel.PizzaDto[]>;
}
