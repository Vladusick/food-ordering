import { ArrowLeft, MapPin, MessageSquare, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./checkout-page.module.css";

export const CheckoutPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button
                    className={styles.back}
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <h1 className={styles.title}>
                    Оформление заказа
                </h1>
            </header>

            <div className={styles.content}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        <Phone size={18} />
                        Телефон
                    </label>

                    <input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        <MapPin size={18} />
                        Адрес доставки
                    </label>

                    <input
                        type="text"
                        placeholder="Введите адрес доставки"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        <MessageSquare size={18} />
                        Комментарий
                    </label>

                    <textarea
                        placeholder="Например: домофон 25, без лука..."
                    />
                </div>
            </div>
        </div>
    );
};