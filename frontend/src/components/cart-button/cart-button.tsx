import { ShoppingBasket } from "lucide-react";
import { useCart } from "../../context/cart-context";
import styles from "./cart-button.module.css";

export const CartButton = () => {
    const { items } = useCart();

    const isHidden = items.length === 0;

    const totalPrice = items.reduce(
        (sum, item) => sum + item.dish.price * item.quantity,
        0
    );

    return (
        <div
            className={`${styles.wrapper} ${isHidden ? styles.hidden : ""
                }`}
        >
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