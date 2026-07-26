import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./cart-page.module.css";
import { useCart } from "../../context/cart-context";
import { CartItem } from "../../components/cart-item/cart-item";

export const CartPage = () => {
    const navigate = useNavigate();

    const { items } = useCart();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button
                    className={styles.back}
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <h1 className={styles.title}>
                    Корзина
                </h1>
            </div>

            <div className={styles.list}>
                {items.map((item) => (
                    <CartItem
                        key={item.dish.id}
                        item={item}
                    />
                ))}
            </div>

            <div className={styles["bottom-bar"]}>
                <div className={styles.total}>
                    Итого: 0 ₽
                </div>

                <button
                    className={styles.button}
                    type="button"
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};