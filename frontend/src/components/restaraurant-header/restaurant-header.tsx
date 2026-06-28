import styles from "./restaurant-header.module.css";

export const RestaurantHeader = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                Sushi House
            </h1>
            <p className={styles.info}>
                ⭐ 4.9 • Доставка 30–40 мин
            </p>
        </header>
    );
};