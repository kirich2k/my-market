import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";

interface cardSliceState {
    totalPrice: number;
    items: cardItem[];
}

export type cardItem = {
    id: number;
    img: string;
    name: string;
    price: number;
    count: number;
}

type minusCardItem = {
    id: number;
    name: string;
    price: number;
};

const {items, totalPrice} = getCartFromLS();

const initialState: cardSliceState = {
    totalPrice: totalPrice,
    items: items,
};
const cartSlices = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<cardItem>) {
            const findItem = state.items.find(
                (obj) =>
                    obj.id === action.payload.id &&
                    obj.name === action.payload.name &&
                    obj.count >= 1
            );
            if (findItem && findItem.count) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<minusCardItem>) {
            const findItem = state.items.find(
                (obj) =>
                    obj.id === action.payload.id &&
                    obj.name === action.payload.name &&
                    obj.count >= 1
            );
            if (findItem) {
                if (findItem.count > 1) {
                    findItem.count--;
                }
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<minusCardItem>) {
            state.items = state.items.filter(
                (obj) =>
                    (obj.id !== action.payload.id) &&
                    (obj.price !== action.payload.price)
            );
            state.totalPrice = calcTotalPrice(state.items);
        },
        celarItems(state) {
            state.items = [];
            state.totalPrice = calcTotalPrice(state.items);
        },
    },
});

export const { addItem, minusItem, removeItem, celarItems } = cartSlices.actions;
export default cartSlices.reducer;
