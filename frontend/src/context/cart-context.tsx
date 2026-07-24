import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Dish } from "../types/dish";
import type { CartItem } from "../types/cart";

type CartContextValue = {
    items: CartItem[];
    addItem: (dish: Dish, quantity?: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
    children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (dish: Dish, quantity = 1) => {
        setItems((prevItems) => {
            const existingCartItem = prevItems.find(
                (cartItem) => cartItem.dish.id === dish.id
            );

            if (existingCartItem) {
                return prevItems.map((cartItem) => {
                    if (cartItem.dish.id === dish.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + quantity,
                        };
                    }

                    return cartItem;
                });
            }

            return [
                ...prevItems,
                {
                    dish,
                    quantity,
                },
            ];
        });
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
};