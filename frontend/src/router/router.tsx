import { createBrowserRouter } from "react-router-dom";

import { MenuPage } from "../pages/menu-page/menu-page";
import { DishPage } from "../pages/dish-page/dish-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuPage />
    },
    {
        path: "/dish/:id",
        element: <DishPage />
    }
]);