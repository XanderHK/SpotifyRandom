import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DynamicObject = {
    [key: string]: any
}

export type GlobalState = { data: DynamicObject }

type GlobalPayload = DynamicObject

// Define the initial state for the queue (an empty array)
const initialState: GlobalState = {
    data: {}
}

// Create a slice for the audio queue
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<GlobalPayload>) => {
            state.data = { ...state.data, ...action.payload };
        },
        clear: (state) => {
            state.data = {}
        }
    },
});

// Export action creators
export const { add, clear } = globalSlice.actions;

// Export the reducer function
export default globalSlice.reducer;


