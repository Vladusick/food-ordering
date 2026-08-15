import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, type Order } from "../../api/orders";
import styles from "./orders-page.module.css";

export const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders().then(setOrders);
    }, []);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button
                    className={styles.back}
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <h1 className={styles.title}>Заказы</h1>
            </header>

            {orders.length === 0 ? (
                <p className={styles.empty}>Заказов пока нет</p>
            ) : (
                <div className={styles.list}>
                    {orders.map((order) => (
                        <div key={order.id} className={styles.card}>
                            <p className={styles.cardTitle}>
                                Заказ №{order.id}
                            </p>

                            <p className={styles.cardText}>
                                {order.phone}
                            </p>

                            <p className={styles.cardText}>
                                {order.address}
                            </p>

                            <p className={styles.cardText}>
                                {order.totalPrice} ₽
                            </p>

                            <div className={styles.items}>
                                {order.items?.map((item) => (
                                    <p
                                        key={item.id}
                                        className={styles.item}
                                    >
                                        {item.quantity} × блюдо #{item.dishId} — {item.price} ₽
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
