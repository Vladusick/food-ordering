import { Injectable } from '@nestjs/common';

@Injectable()
export class DishesService {
  findAll() {
    return [
      {
        id: 1,
        name: 'Пицца Пепперони',
        price: 890,
      },
      {
        id: 2,
        name: 'Бургер',
        price: 450,
      },
    ];
  }
}