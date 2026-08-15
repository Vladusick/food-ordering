import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Dish } from "../types/dish";
import type { CartItem } from "../types/cart";

type CartContextValue = {
    items: CartItem[];
    addItem: (dish: Dish, quantity?: number) => void;
    increaseItem: (dishId: number) => void;
    decreaseItem: (dishId: number) => void;
    clearCart: () => void;
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

    const increaseItem = (dishId: number) => {
        setItems((prevItems) => {
            return prevItems.map((cartItem) => {
                if (cartItem.dish.id === dishId) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    };
                }

                return cartItem;
            });
        });
    };

    const decreaseItem = (dishId: number) => {
        setItems((prevItems) => {
            return prevItems
                .map((cartItem) => {
                    if (cartItem.dish.id === dishId) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                        };
                    }

                    return cartItem;
                })
                .filter((cartItem) => cartItem.quantity > 0);
        });
    };

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                increaseItem,
                decreaseItem,
                clearCart,
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