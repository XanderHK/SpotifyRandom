import { RootState } from "../store";

export const selectData = (state: RootState, key: string) => {
    return state.global.data[key];
};