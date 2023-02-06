import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Home from './pages/HomePage/Home';
import { store } from './redux/configStore';
import HomeTemplate from './template/HomeTemplate';
import '../src/assets/scss/style.scss'
import Detail from './pages/DetailPage/Detail';
import Cart from './pages/CartPage/Cart';
import Register from './pages/RegisterPage/Register';
import Login from './pages/LoginPage/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';


export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="/home" element={<Home />}></Route>
          <Route index element={<Home />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='cart'>
            <Route path=':id' element={<Cart />}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<UserProfilePage />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);


