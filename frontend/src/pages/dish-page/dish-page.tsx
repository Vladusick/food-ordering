import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./dish-page.module.css"
import { getDish } from "../../api/dishes";
import type { Dish } from "../../types/dish";
import { ArrowLeft } from "lucide-react";

export const DishPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [dish, setDish] = useState<Dish | null>(null);
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (!id) {
            return;
        }

        getDish(Number(id)).then(setDish);
    }, [id]);

    if (!dish) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles["image-wrapper"]}>
                <button
                    className={styles.back}
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                </button>

                <img
                    className={styles.image}
                    src={`${import.meta.env.VITE_API_URL}${dish.imageUrl}`}
                    alt={dish.name}
                />
            </div>

            <div className={styles.content}>
                <p className={styles.description}>
                    {dish.description}
                </p>
            </div>

            <div className={styles["dish-panel"]}>
                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {dish.name}
                    </h1>

                    <p className={styles.weight}>
                        {dish.weight} г
                    </p>

                    <p className={styles.price}>
                        {dish.price} ₽
                    </p>


                </div>

                <div className={styles.actions}>
                    <div className={styles.counter}>
                        <button
                            type="button"
                            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                        >
                            −
                        </button>

                        <span>{count}</span>

                        <button
                            type="button"
                            onClick={() => setCount((prev) => prev + 1)}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className={styles.button}
                        type="button"
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};