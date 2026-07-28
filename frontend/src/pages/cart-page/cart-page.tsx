import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./cart-page.module.css";
import { useCart } from "../../context/cart-context";
import { CartItem } from "../../components/cart-item/cart-item";
import { useEffect } from "react";

export const CartPage = () => {
    const navigate = useNavigate();

    const { items } = useCart();

    const totalPrice = items.reduce((sum, item) => {
        return sum + item.dish.price * item.quantity;
    }, 0
    );

    useEffect(() => {
        if (items.length === 0) {
            navigate("/", { replace: true });
        }
    }, [items, navigate]);

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
                    <span>Итого:</span>

                    <span>{totalPrice} ₽</span>
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