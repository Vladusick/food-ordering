import { categories } from "../../constants/categories";
import styles from "./category-tabs.module.css";

type Props = {
    onSelect: (id: string) => void;
};

export const CategoryTabs = ({ onSelect }: Props) => {
    return (
        <div className={styles.tabs}>
            {categories.map(category => (
                <button
                    key={category.id}
                    className={styles.tab}
                    onClick={() => onSelect(category.id)}
                >
                    {category.title}
                </button>
            ))}
        </div>
    );
};