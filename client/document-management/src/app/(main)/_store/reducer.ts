import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { documentsApi } from "./services/documentApi";
import authReducer from "./features/authSlide"
import userReducer from "./features/userSlide"
import statusReducer from "./features/statusSlide"
import navbarReducer from "./features/navBarSlide"

import { authApi } from "./services/authApi";
import { ministriesApi } from "./services/ministriesApi";

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
    user: userReducer,
    auth: authReducer,
    status: statusReducer,
    navbar: navbarReducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [ministriesApi.reducerPath]: ministriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer

})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;