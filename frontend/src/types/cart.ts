import type { Dish } from "./dish";

export type CartItem = {
    dish: Dish;
    quantity: number;
};