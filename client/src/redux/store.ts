// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import { setupListeners } from "@reduxjs/toolkit/query";
// Slices
import { authSlice } from "./slices/auth.slice";
import { modalsSlice } from "./slices/modals.slice";

// Api
import { authApi } from "./apis/auth.api";
import { storageApi } from "./apis/storage.api";
import { categoryApi } from "./apis/category.api";
import { collectionApi } from "./apis/collection.api";
import { sizeApi } from "./apis/size.api";
import { variantApi } from "./apis/variant.api";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [authSlice.name],
  blacklist: [
    modalsSlice.name,

    authApi.reducerPath,
    storageApi.reducerPath,
    categoryApi.reducerPath,
    collectionApi.reducerPath,
    variantApi.reducerPath,
    sizeApi.reducerPath,

  ],
};

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [modalsSlice.name]: modalsSlice.reducer,

  [authApi.reducerPath]: authApi.reducer,
  [storageApi.reducerPath]: storageApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [collectionApi.reducerPath]: collectionApi.reducer,
  [variantApi.reducerPath]: variantApi.reducer,
  [sizeApi.reducerPath]: sizeApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(storageApi.middleware)
      .concat(categoryApi.middleware)
      .concat(collectionApi.middleware)
      .concat(variantApi.middleware)
      .concat(sizeApi.middleware),
});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
