import { cardItem } from "../redux/slices/cartSlices";

export const calcTotalPrice = (items: cardItem[]) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);
};