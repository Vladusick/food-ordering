
import type { Dish } from "../../types/dish";
import styles from "./dish-card.module.css";

type Props = {
  dish: Dish;
};

export const DishCard = ({ dish }: Props) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={dish.imageUrl}
        alt={dish.name}
      />

      <div className={styles.content}>
        <h3>{dish.name}</h3>

        <div className={styles.bottom}>
          <span>{dish.price} ₽</span>

          <button>+</button>
        </div>
      </div>
    </div>
  );
}