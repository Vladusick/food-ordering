import styles from "./category-tabs.module.css";

const categories = [
    "Роллы",
    "Пицца",
    "Напитки",
];

export const CategoryTabs = () => {
    return (
        <div className={styles.tabs}>
            {categories.map(category => (
                <button
                    key={category}
                    className={styles.tab}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};