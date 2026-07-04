import type { Dish } from "../../types/dish";
import styles from "./dish-card.module.css";

type Props = {
  dish: Dish;
};

export const DishCard = ({ dish }: Props) => {
  const imageUrl = `${import.meta.env.VITE_API_URL}${dish.imageUrl}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={dish.name}
        />

        <button className={styles.button}>
          +
        </button>
      </div>

      <div className={styles.content}>
        <span className={styles.price}>
          {dish.price} ₽
        </span>

        <h3 className={styles.title}>
          {dish.name}
        </h3>
      </div>
    </div>
  );
};