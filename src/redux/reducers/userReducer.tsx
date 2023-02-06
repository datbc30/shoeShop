import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import React from 'react'
import { ACCESS_TOKEN, getStore, getStoreJson, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { redirect } from "react-router-dom";
import axios from "axios";
import { history } from "../../index";

export interface UserModel {
  email: string;
  password:string;
  passwordConfirm:string;
  name:string;
  phone:string;
  gender:string;
}   

export interface userLogin {
  email: string;
  password: string;
}

export interface Profile {
  email: string;
  password:string;
  name:string;
  phone:string;
  gender:string;
}
export interface OderHistory{
  id:string;
  name:string;
  price:number;
  image:string;
  quantity:number;
}

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN) || {},
  userToken: "",
};
const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: { 
    userCheck: (state, action: PayloadAction<Profile>) => {
      state.userToken = action.payload;
    },
    getProfileAction: (state, action: PayloadAction<Profile>) => {
      state.userLogin = action.payload;
    },
   
  }
});

export const {userCheck,getProfileAction} = userReducer.actions;
export default userReducer.reducer;

export const registerApi = (userRes: UserModel) => {
  return async () => {
    try {
      const result = await http.post("/users/signup", userRes);
      const key = "updatable";
      const Mess = () => {
        message.loading({ content: "Vui lòng chờ", key });
        setTimeout(() => {
          message.success({ content: "Đăng ký thành công!", key, duration: 2 });
        }, 3000);
      };
      Mess();
      history.push("/login");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};

export const LoginApi = (userLogin: userLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result: any = await http.post(
        "/users/signin",
        userLogin
      );
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      dispatch(userCheck(result.data.content.accessToken));
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch: AppDispatch) => {
    const token = getStore(ACCESS_TOKEN)
    // console.log({token});
    try {
      let url = "https://shop.cyberlearn.vn/api/Users/getProfile";
      let headers = { Authorization: `Bearer ${token}` };
      const result = await axios.post(url, {}, { headers });
      
      const action = getProfileAction(result.data.content);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};