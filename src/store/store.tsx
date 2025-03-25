import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import productsReducer from './slice/productSlice';

const persistConfig = {
    key: 'products',
    storage,
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
    reducer: {
        productsReducer: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;