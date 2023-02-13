import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { number } from "yup";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { redirect } from "react-router-dom";

export interface ProductModel {
  id: number,
  name: string,
  alias: string,
  price: number,
  description: string,
  size: number[],
  shortDescription: string,
  quantity: number,
  deleted: boolean,
  categories: object[],
  relatedProducts: number[],
  feature: boolean,
  image: string
}

export interface ProductDetail {
  id: number;
  name: string;
  alias: string;
  price: number;
  feature: boolean;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  image: string;
  categories: Category[];
  relatedProducts: RelatedProduct[];
}

export interface ProductCart {
  id: number;
  name: string;
  price: number;
  quantityBuy: number;
  image: string;
}

export interface Category {
  id: string;
  category: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  alias: string;
  feature: boolean;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
}

const initialState: any = {
  arrProduct: [],
  productDetail: [],
  arrCart: [],
  arrProductSearch: []
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action: PayloadAction<ProductModel[]>) => {
      state.arrProduct = action.payload
    },
    getProductDetail: (state, action: PayloadAction<ProductDetail[]>) => {
      state.productDetail = action.payload
    },
    addToCart: (state, action: PayloadAction<ProductCart>) => {
      state.arrCart.push(action.payload)
    },
    remoteFormCart: (state, action: PayloadAction<ProductCart>) => {
      console.log(action.payload);
      state.arrCart = state.arrCart.filter(
        (pro: any) => pro.id !== action.payload
      )
    },
    clearCart: (state, action: PayloadAction<ProductCart>) => {
      state.arrCart = []
    },
    getAllProductSearch: (state, action: PayloadAction<ProductModel[]>) => {
      state.arrProductSearch = action.payload
    }
  }
});


export const { getProductAction, getProductDetail, addToCart, remoteFormCart, clearCart, getAllProductSearch } = productReducer.actions;

export default productReducer.reducer;

export const getProductApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("Product")
      let arrProduct: ProductModel[] = result.data.content
      const action = getProductAction(arrProduct)
      dispatch(action)
    }
    catch (err) {
      console.log({ err });
    }
  }
}

export const getProductDetailApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`Product/getbyid?id=${id}`)
      console.log({ result });
      if (!result) {
        return redirect("/home");
      }
      let arrDetail: ProductDetail[] = result.data.content
      const action = getProductDetail(arrDetail)
      dispatch(action)
    }
    catch (err) {
      console.log({ err });
    }
  }
}

export const getProductSearchApi = (name: any) => {
   console.log({name});
   
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `https://shop.cyberlearn.vn/api/Product?keyword=${name}`
      )
      let list: ProductModel[] = result.data.content;
      const action = getAllProductSearch(list)
      dispatch(action)
    }
    catch (err) {
      console.log({ err });

    }
  }
}
