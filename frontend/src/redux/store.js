
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth"], 
};


const companyPersistConfig = {
    key: "company",
    storage,
    whitelist: ["singleCompany", "companies"], 
};

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice, 
    company: persistReducer(companyPersistConfig, companySlice),
    application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }), 
});

export const persistor = persistStore(store);
export default store;
