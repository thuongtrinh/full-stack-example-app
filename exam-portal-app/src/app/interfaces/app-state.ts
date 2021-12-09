import { DataState } from "../enum/data-state.enum";

export interface AppState<U> {
    // dataState: DataState;
    appData?: U;
    error?: string;
}
