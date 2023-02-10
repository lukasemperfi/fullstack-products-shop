import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { categoriesSlice } from "./categories-slice/categories-slice";
import { commentSlice } from "./comment-slice/comment-slice";
import { favoritesSlice } from "./favorites-slice/favorites-slice";
import { priceDynamicSlice } from "./price-dynamic-slice/price-dynamic-slice";
import { productDetailsSlice } from "./product-details-slice/product-details-slice";
import { productsCategoriesSearchDataSlice } from "./products-categories-search-data-slice/products-categories-search-data-slice";
import { productsFiltersDataSlice } from "./products-filters-data-slice/products-filters-data.slice.";
import { productStatisticSlice } from "./products-statistic-slice/products-statistic-slice";
import { productsSlice } from "./products-slice/products-slice";
import { reactionSlice } from "./reaction-slice/reaction-slice";
import { rolesSlice } from "./roles-slice/roles-slice";
import { RootReducers } from "./rootReducers";
import { userSlice } from "./user-slice/user-slice";
import { usersSlice } from "./users-slice/users-slice";

const rootReducer = combineReducers({
  [RootReducers.categories]: categoriesSlice,
  [RootReducers.products]: productsSlice,
  [RootReducers.productsFiltersData]: productsFiltersDataSlice,
  [RootReducers.productsCategoriesSearchData]:
    productsCategoriesSearchDataSlice,
  [RootReducers.user]: userSlice,
  [RootReducers.users]: usersSlice,
  [RootReducers.favorites]: favoritesSlice,
  [RootReducers.productDetails]: productDetailsSlice,
  [RootReducers.priceDynamic]: priceDynamicSlice,
  [RootReducers.comments]: commentSlice,
  [RootReducers.reaction]: reactionSlice,
  [RootReducers.productStatistic]: productStatisticSlice,
  [RootReducers.roles]: rolesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    RootReducers.categories,
    RootReducers.products,
    RootReducers.productsFiltersData,
    RootReducers.productsCategoriesSearchData,
    RootReducers.user,
    RootReducers.users,
    RootReducers.favorites,
    RootReducers.productDetails,
    RootReducers.priceDynamic,
    RootReducers.comments,
    RootReducers.reaction,
    RootReducers.productStatistic,
    RootReducers.roles,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
