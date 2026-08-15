import { createBrowserRouter } from "react-router-dom";

import { MenuPage } from "../pages/menu-page/menu-page";
import { DishPage } from "../pages/dish-page/dish-page";
import { CartPage } from "../pages/cart-page/cart-page";
import { CheckoutPage } from "../pages/checkout-page/checkout-page";
import { OrderSuccessPage } from "../pages/order-success-page/order-success-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuPage />
    },
    {
        path: "/dish/:id",
        element: <DishPage />
    },
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/checkout",
        element: <CheckoutPage />
    },
    {
        path: "/order-success/:orderId",
        element: <OrderSuccessPage />
    }
]);