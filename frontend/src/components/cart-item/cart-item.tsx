import { useCart } from "../../context/cart-context";
import type { CartItem as CartItemType } from "../../types/cart";
import styles from "./cart-item.module.css";

type Props = {
    item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
    const { dish, quantity } = item;

    const { increaseItem, decreaseItem } = useCart();

    const imageUrl = `${import.meta.env.VITE_API_URL}${dish.imageUrl}`;

    return (
        <div className={styles.item}>
            <img
                className={styles.image}
                src={imageUrl}
                alt={dish.name}
            />

            <div className={styles.info}>
                <div>
                    <h3 className={styles.title}>
                        {dish.name}
                    </h3>

                    <div className={styles.details}>
                        <span>
                            {dish.price} ₽
                        </span>

                        <span>
                            {dish.weight} г
                        </span>
                    </div>
                </div>

                <div className={styles.counter}>
                    <button type="button" onClick={() => decreaseItem(dish.id)}>
                        −
                    </button>

                    <span>
                        {quantity}
                    </span>

                    <button type="button" onClick={() => increaseItem(dish.id)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};