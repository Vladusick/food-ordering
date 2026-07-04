import { useEffect, useState } from "react";

import { getDishes } from "../../api/dishes";
import { DishCard } from "../../components/dish-card/dish-card";

import type { Dish } from "../../types/dish";

import styles from "./menu-page.module.css";
import { RestaurantHeader } from "../../components/restaraurant-header/restaurant-header";
import { CategoryTabs } from "../../components/category-tabs/category-tabs";
import { categories } from "../../constants/categories";

export const MenuPage = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        getDishes().then(setDishes);
    }, []);

    const scrollToCategory = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });
    };

    return (
        <div className={styles.page}>
            <RestaurantHeader />
            <CategoryTabs onSelect={scrollToCategory} />
            {categories.map(category => (
                <section
                    key={category.id}
                    id={category.id}
                    className={styles.section}
                >
                    <h2 className={styles.title}>
                        {category.title}
                    </h2>

                    <div className={styles.grid}>
                        {dishes
                            .filter(dish => dish.category === category.id)
                            .map(dish => (
                                <DishCard
                                    key={dish.id}
                                    dish={dish}
                                />
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
};