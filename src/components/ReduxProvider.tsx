"use client"; 

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../store/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>
            <PersistGate loading={<div>Загрузка...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>;
};

export default ReduxProvider;