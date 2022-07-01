import { cardItem } from "../redux/slices/cartSlices";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as cardItem[],
        totalPrice,
    };
};
