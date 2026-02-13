import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";
import { IPizzaPort } from "@nest-or-front/modules/pizza/core/port/pizza.port";

export class PizzaInMemoryAdapter implements IPizzaPort {
  private pizzas: PizzaDomainModel.PizzaDto[] = [
    {
      id: 1,
      name: "Margherita",
      price: 10,
      ingredients: ["tomato", "mozzarella", "basil"],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      name: "4 Fromages",
      price: 12,
      ingredients: ["mozzarella", "gorgonzola", "parmesan", "chevre"],
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];
  private nextId = 3;

  async listPizzas(): Promise<PizzaDomainModel.PizzaDto[]> {
    return [...this.pizzas];
  }

  async getPizzaById(id: number): Promise<PizzaDomainModel.PizzaDto> {
    const pizza = this.pizzas.find((p) => p.id === id);
    if (!pizza) throw new Error(`Pizza ${id} not found`);
    return pizza;
  }

  async createPizza(
    dto: PizzaDomainModel.CreatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto> {
    const now = new Date();
    const pizza = { ...dto, id: this.nextId++, createdAt: now, updatedAt: now, deletedAt: null };
    this.pizzas.push(pizza);
    return pizza;
  }

  async updatePizza(
    id: number,
    dto: PizzaDomainModel.UpdatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto> {
    const index = this.pizzas.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Pizza ${id} not found`);
    this.pizzas[index] = { ...this.pizzas[index], ...dto, id, updatedAt: new Date() };
    return this.pizzas[index];
  }

  async deletePizza(id: number): Promise<{ message: string }> {
    this.pizzas = this.pizzas.filter((p) => p.id !== id);
    return { message: `Pizza ${id} deleted` };
  }

  async searchByIngredients(
    ingredients: string[]
  ): Promise<PizzaDomainModel.PizzaDto[]> {
    return this.pizzas.filter((p) =>
      ingredients.every((i) => p.ingredients.includes(i))
    );
  }

  async filterPizzas(
    filters: PizzaDomainModel.PizzaFiltersDto
  ): Promise<PizzaDomainModel.PizzaDto[]> {
    let result = [...this.pizzas];
    if (filters.ingredient != null) {
      const q = filters.ingredient.toLowerCase();
      result = result.filter((p) =>
        p.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }
    if (filters.ingredients != null) {
      const items = filters.ingredients.split(",").map((s) => s.trim().toLowerCase());
      result = result.filter((p) =>
        items.every((q) => p.ingredients.some((i) => i.toLowerCase().includes(q)))
      );
    }
    if (filters.name != null) {
      const q = filters.name.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.available != null) {
      result = result.filter((p) => p.available === filters.available);
    }
    return result;
  }
}
