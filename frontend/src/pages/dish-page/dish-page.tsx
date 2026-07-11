import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./dish-page.module.css"
import { getDish } from "../../api/dishes";
import type { Dish } from "../../types/dish";

export const DishPage = () => {
    const { id } = useParams();

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
            <img
                className={styles.image}
                src={`${import.meta.env.VITE_API_URL}${dish.imageUrl}`}
                alt={dish.name}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>
                    {dish.name}
                </h1>
                <p className={styles.description}>
                    {dish.description}
                </p>
                <div className={styles.info}>
                    <p className={styles.price}>
                        {dish.price} ₽
                    </p>
                    <p className={styles.weight}>
                        {dish.weight} г
                    </p>
                </div>
                <div className={styles["bottom-bar"]}>
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
                        Добавить • {dish.price * count} ₽
                    </button>
                </div>
            </div>
        </div >
    );
};