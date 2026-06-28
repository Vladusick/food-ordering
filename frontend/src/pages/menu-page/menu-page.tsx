import { useEffect, useState } from "react";

import { getDishes } from "../../api/dishes";
import { DishCard } from "../../components/dish-card/dish-card";

import type { Dish } from "../../types/dish";

import styles from "./menu-page.module.css";

export const MenuPage = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        getDishes().then(setDishes);
    }, []);

    return (
        <div className={styles.page}>
              <h1>Кафе</h1>
        <p>У дяди Сэма</p>
            {dishes.map((dish) => (
                <DishCard
                    key={dish.id}
                    dish={dish}
                />
            ))}
        </div>
    );
};