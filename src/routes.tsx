import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import Cart from "./pages/CartPage/Cart";
import Detail from "./pages/DetailPage/Detail";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Search from "./pages/SearchPage/Search";
import UserProfilePage from "./pages/UserProfile/UserProfilePage";
import HomeTemplate from "./template/HomeTemplate";

export const Routers = () => {
  const {pathname} = useLocation()
  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])
  return (<Routes>
    <Route path="" element={<HomeTemplate />}>
      <Route path="/home" element={<Home />}></Route>
      <Route index element={<Home />}></Route>
      <Route path='/detail/:id' element={<Detail />}>
      </Route>
      <Route path='cart'>
        <Route path=':id' element={<Cart />}></Route>
      </Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<UserProfilePage />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="*"
        element={<Navigate to="/" />}></Route>
    </Route>
  </Routes>)
}