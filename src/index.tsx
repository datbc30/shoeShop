import { createBrowserHistory } from 'history';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  useLocation,
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
import Search from './pages/SearchPage/Search';
import { Routers } from './routes';


export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routers/>
    </HistoryRouter>
  </Provider>
);


