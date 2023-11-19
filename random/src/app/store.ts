import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import queueReducer from './reducers/queue';
import globalReducer, { GlobalState } from './reducers/global';

// Define your individual state types
type QueueState = HTMLAudioElement[];

// Define a root state type that combines the individual state types
export type RootState = {
    queue: QueueState;
    global: GlobalState;
};

// Create a rootReducer by specifying the types of your reducers
const rootReducer = combineReducers({
    queue: queueReducer,
    global: globalReducer,
});


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;