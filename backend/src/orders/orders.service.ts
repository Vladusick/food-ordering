import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Dish } from '../dishes/entities/dish.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Dish)
    private readonly dishesRepository: Repository<Dish>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<{
    id: number;
    phone: string;
    address: string;
    comment: string;
    totalPrice: number;
    createdAt: Date;
  }> {
    const phone = createOrderDto.phone?.trim() ?? '';
    const address = createOrderDto.address?.trim() ?? '';
    const comment = createOrderDto.comment?.trim() ?? '';

    if (!phone) {
      throw new BadRequestException('Введите номер телефона');
    }

    if (phone.length < 10 || phone.length > 12) {
      throw new BadRequestException('Введите корректный номер телефона');
    }

    if (!address) {
      throw new BadRequestException('Введите адрес доставки');
    }

    if (!createOrderDto.items?.length) {
      throw new BadRequestException('Корзина пуста');
    }

    for (const item of createOrderDto.items) {
      if (!Number.isInteger(item.dishId) || item.dishId <= 0) {
        throw new BadRequestException('Некорректный идентификатор блюда');
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new BadRequestException('Некорректное количество блюда');
      }
    }

    const dishIds = [...new Set(createOrderDto.items.map((item) => item.dishId))];
    const dishes = await this.dishesRepository.findBy({ id: In(dishIds) });

    if (dishes.length !== dishIds.length) {
      throw new NotFoundException('Одно или несколько блюд не найдены');
    }

    const dishesById = new Map(dishes.map((dish) => [dish.id, dish]));

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const dish = dishesById.get(item.dishId)!;
      totalPrice += dish.price * item.quantity;

      const orderItem = new OrderItem();
      orderItem.dishId = dish.id;
      orderItem.quantity = item.quantity;
      orderItem.price = dish.price;
      orderItems.push(orderItem);
    }

    const order = new Order();
    order.phone = phone;
    order.address = address;
    order.comment = comment;
    order.totalPrice = totalPrice;
    order.items = orderItems;

    const savedOrder = await this.ordersRepository.save(order);

    return {
      id: savedOrder.id,
      phone: savedOrder.phone,
      address: savedOrder.address,
      comment: savedOrder.comment,
      totalPrice: savedOrder.totalPrice,
      createdAt: savedOrder.createdAt,
    };
  }
}
