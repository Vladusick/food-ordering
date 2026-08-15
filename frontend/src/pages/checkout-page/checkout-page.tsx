import {
    ArrowLeft,
    MapPin,
    MessageSquare,
    Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./checkout-page.module.css";
import { createOrder } from "../../api/orders";
import { useCart } from "../../context/cart-context";

export const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items } = useCart();

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");

    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalPrice = items.reduce((sum, item) => {
        return sum + item.dish.price * item.quantity;
    }, 0);

    useEffect(() => {
        if (items.length === 0) {
            navigate("/", { replace: true });
        }
    }, [items, navigate]);

    const handlePhoneChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const rawValue = event.target.value;
        const startsWithPlus = rawValue.startsWith("+");
        const digits = rawValue.replace(/\D/g, "");

        let nextPhone = (startsWithPlus ? "+" : "") + digits;

        if (nextPhone.length > 12) {
            nextPhone = nextPhone.slice(0, 12);
        }

        setPhone(nextPhone);

        if (phoneError) {
            setPhoneError("");
        }
    };

    // todo - надо проверить варлидацию номера, протестировать. 
    const validateForm = () => {
        let isValid = true;

        setPhoneError("");
        setAddressError("");

        if (!phone.trim()) {
            setPhoneError("Введите номер телефона");
            isValid = false;
        } else if (phone.length < 10 || phone.length > 12) {
            setPhoneError("Введите корректный номер телефона");
            isValid = false;
        }

        if (!address.trim()) {
            setAddressError("Введите адрес доставки");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const order = await createOrder({
                phone,
                address,
                comment: comment.trim() || undefined,
                items: items.map((item) => ({
                    dishId: item.dish.id,
                    quantity: item.quantity,
                })),
            });

            navigate(`/order-success/${order.id}`, { replace: true });
        } catch {
            setSubmitError("Не удалось оформить заказ. Попробуйте ещё раз.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button
                    className={styles.back}
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft
                        size={24}
                        strokeWidth={2.5}
                    />
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
                        inputMode="tel"
                        maxLength={12}
                        value={phone}
                        onChange={handlePhoneChange}
                    />

                    {phoneError && (
                        <span className={styles.error}>
                            {phoneError}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        <MapPin size={18} />
                        Адрес доставки
                    </label>

                    <input
                        type="text"
                        placeholder="Введите адрес доставки"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);

                            if (addressError) {
                                setAddressError("");
                            }
                        }}
                    />

                    {addressError && (
                        <span className={styles.error}>
                            {addressError}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        <MessageSquare size={18} />
                        Комментарий
                    </label>

                    <textarea
                        placeholder="Например: домофон 25, без лука..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {submitError && (
                    <span className={styles.error}>
                        {submitError}
                    </span>
                )}
            </div>

            <div className={styles["bottom-bar"]}>
                <div className={styles.total}>
                    <span>Итого:</span>

                    <span>{totalPrice} ₽</span>
                </div>

                <button
                    className={styles.button}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
                </button>
            </div>
        </div>
    );
};