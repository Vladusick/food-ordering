import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./order-success-page.module.css";
import { useCart } from "../../context/cart-context";

export const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { clearCart } = useCart();

    const parsedOrderId = Number(orderId);

    useEffect(() => {
        if (!parsedOrderId || Number.isNaN(parsedOrderId)) {
            navigate("/", { replace: true });
            return;
        }

        clearCart();
    }, [parsedOrderId, navigate, clearCart]);

    if (!parsedOrderId || Number.isNaN(parsedOrderId)) {
        return null;
    }

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.title}>Заказ принят</h1>

                <p className={styles.text}>
                    Ваш заказ №{parsedOrderId} успешно оформлен.
                    Мы скоро свяжемся с вами.
                </p>

                <button
                    className={styles.button}
                    type="button"
                    onClick={() => navigate("/")}
                >
                    На главную
                </button>
            </div>
        </div>
    );
};
