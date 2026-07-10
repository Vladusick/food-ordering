import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishesRepository: Repository<Dish>,
  ) { }

  async findAll(): Promise<Dish[]> {
    return this.dishesRepository.find();
  }

  async findOne(id: number): Promise<Dish | null> {
    return this.dishesRepository.findOneBy({ id });
  }
}