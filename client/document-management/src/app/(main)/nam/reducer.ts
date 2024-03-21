import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";
import { documentsApi } from "./services/documentApi";
import statusReducer from "./features/statusSlide";
import { use } from "react";
import { userApi } from "./services/userApi";

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    version: 1,
}

const tempCartPersistConfig = {
    // key: 'tempCart',
    // storage: sessionStorage,
    // version: 1,
}

const rootReducer = combineReducers({
    status: statusReducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer

})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;