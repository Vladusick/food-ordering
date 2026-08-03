import { useCart } from "../../context/cart-context";
import type { Dish } from "../../types/dish";
import styles from "./dish-card.module.css";
import { Link } from "react-router-dom";

type Props = {
  dish: Dish;
};

export const DishCard = ({ dish }: Props) => {
  const imageUrl = `${import.meta.env.VITE_API_URL}${dish.imageUrl}`;

  const { items, addItem, increaseItem, decreaseItem } = useCart();

  const cartItem = items.find(
    (item) => item.dish.id === dish.id
  );

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


        {cartItem ? (
          <div
            className={styles.counter}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              onClick={() => decreaseItem(dish.id)}
            >
              −
            </button>

            <span>{cartItem.quantity}</span>

            <button
              type="button"
              onClick={() => increaseItem(dish.id)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(dish);
            }}
          >
            +
          </button>
        )}


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