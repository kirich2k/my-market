import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterSliceState {
    activeCategories: number;
    listVisible: boolean;
    activeListLine: number;
    inpValue: string;
}

type filtersAction = {
    activeCategories: number;
    activeListLine: number;
}

const initialState: filterSliceState = {
    activeCategories: -1,
    listVisible: false,
    activeListLine: 0,
    inpValue: "",
};
const filterSlices = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setActiveCategories(state, action: PayloadAction<number>) {
            state.activeCategories = action.payload;
        },
        setListVisible(state, action: PayloadAction<boolean>) {
            state.listVisible = action.payload;
        },
        setActiveListLine(state, action: PayloadAction<number>) {
            state.activeListLine = action.payload;
        },
        setFilters(state, action: PayloadAction<filtersAction>) {
            state.activeCategories = action.payload.activeCategories;
            state.activeListLine = action.payload.activeListLine;
        },
        setInpValue(state, action: PayloadAction<string>) {
            state.inpValue = action.payload
        },
    },
});

export const {
    setActiveCategories,
    setListVisible,
    setActiveListLine,
    setFilters,
    setInpValue,
} = filterSlices.actions;
export default filterSlices.reducer;
