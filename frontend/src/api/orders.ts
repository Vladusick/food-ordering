import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type CreateOrderItem = {
    dishId: number;
    quantity: number;
};

export type CreateOrderPayload = {
    phone: string;
    address: string;
    comment?: string;
    items: CreateOrderItem[];
};

export type Order = {
    id: number;
    phone: string;
    address: string;
    comment: string;
    totalPrice: number;
    createdAt: string;
};

export const createOrder = async (
    payload: CreateOrderPayload
): Promise<Order> => {
    const res = await axios.post(`${API_URL}/orders`, payload);
    return res.data;
};
