import { useEffect, useState } from "react";

import { getDishes } from "../../api/dishes";
import { DishCard } from "../../components/dish-card/dish-card";

import type { Dish } from "../../types/dish";

import styles from "./menu-page.module.css";
import { RestaurantHeader } from "../../components/restaraurant-header/restaurant-header";
import { CategoryTabs } from "../../components/category-tabs/category-tabs";

export const MenuPage = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        getDishes().then(setDishes);
    }, []);

    return (
        <div className={styles.page}>
            <RestaurantHeader/>
            <CategoryTabs/>
            <div className={styles.grid}>
            {dishes.map((dish) => (
                <DishCard
                    key={dish.id}
                    dish={dish}
                />
            ))}
            </div>
        </div>
    );
};