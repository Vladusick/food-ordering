import type { Dish } from "../../types/dish";
import styles from "./dish-card.module.css";
import { Link } from "react-router-dom";

type Props = {
  dish: Dish;
};

export const DishCard = ({ dish }: Props) => {
  const imageUrl = `${import.meta.env.VITE_API_URL}${dish.imageUrl}`;

  return (
    <Link
      to={`/dish/${dish.id}`}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt={dish.name}
        />

        <button className={styles.button} onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          alert("Тут будет добавление в корзину");
        }}>
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
    </Link>
  );
};