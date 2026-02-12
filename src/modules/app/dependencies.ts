import { IPizzaPort } from "@nest-or-front/modules/pizza/core/port/pizza.port";
import { IDrinkPort } from "@nest-or-front/modules/drink/core/port/drink.port";
import { IDessertPort } from "@nest-or-front/modules/dessert/core/port/dessert.port";
import { IOrderPort } from "@nest-or-front/modules/order/core/port/order.port";

export type Dependencies = {
  pizzaGateway: IPizzaPort;
  drinkGateway: IDrinkPort;
  dessertGateway: IDessertPort;
  orderGateway: IOrderPort;
};
