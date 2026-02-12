import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";
import { IDessertPort } from "@nest-or-front/modules/dessert/core/port/dessert.port";

export class DessertInMemoryAdapter implements IDessertPort {
  private desserts: DessertDomainModel.DessertDto[] = [
    { id: 1, name: "Tiramisu", price: 6, available: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
    { id: 2, name: "Panna Cotta", price: 5, available: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
  ];
  private nextId = 3;

  async listDesserts(): Promise<DessertDomainModel.DessertDto[]> {
    return [...this.desserts];
  }

  async getDessertById(id: number): Promise<DessertDomainModel.DessertDto> {
    const dessert = this.desserts.find((d) => d.id === id);
    if (!dessert) throw new Error(`Dessert ${id} not found`);
    return dessert;
  }

  async createDessert(
    dto: DessertDomainModel.CreateDessertDto
  ): Promise<DessertDomainModel.DessertDto> {
    const now = new Date();
    const dessert = { ...dto, id: this.nextId++, createdAt: now, updatedAt: now, deletedAt: null };
    this.desserts.push(dessert);
    return dessert;
  }

  async updateDessert(
    id: number,
    dto: DessertDomainModel.UpdateDessertDto
  ): Promise<DessertDomainModel.DessertDto> {
    const index = this.desserts.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Dessert ${id} not found`);
    this.desserts[index] = { ...this.desserts[index], ...dto, id, updatedAt: new Date() };
    return this.desserts[index];
  }

  async deleteDessert(id: number): Promise<{ message: string }> {
    this.desserts = this.desserts.filter((d) => d.id !== id);
    return { message: `Dessert ${id} deleted` };
  }

  async filterDesserts(
    filters: DessertDomainModel.DessertFiltersDto
  ): Promise<DessertDomainModel.DessertDto[]> {
    let result = [...this.desserts];
    if (filters.name !== undefined) {
      const q = filters.name.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    if (filters.available !== undefined) {
      result = result.filter((d) => d.available === filters.available);
    }
    return result;
  }
}
