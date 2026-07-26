import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/cart-context";
import styles from "./cart-button.module.css";

export const CartButton = () => {
    const { items } = useCart();

    if (items.length === 0) {
        return null;
    }

    const totalPrice = items.reduce(
        (sum, item) => {
            return sum + item.dish.price * item.quantity;
        },
        0
    );

    return (
        <div className={styles.wrapper}>
            <button
                className={styles.button}
                type="button"
            >
                <ShoppingBasket size={22} strokeWidth={2.5} />
                {totalPrice}₽
            </button>
        </div>
    );
};