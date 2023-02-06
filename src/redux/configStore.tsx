import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'



export const store = configureStore({
  reducer: {
    numberReducer: (state, action: PayloadAction<number>) => {
      return 1;
    },
    productReducer: productReducer,
    userReducer:userReducer
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;