import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlices';
import cart from './slices/cartSlices'

export const store = configureStore({
    reducer: {
        filter,
        cart,
    }
})
export type RootStore = ReturnType<typeof store.getState>;