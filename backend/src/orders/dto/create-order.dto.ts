export class CreateOrderItemDto {
  dishId!: number;
  quantity!: number;
}

export class CreateOrderDto {
  phone!: string;
  address!: string;
  comment?: string;
  items!: CreateOrderItemDto[];
}
