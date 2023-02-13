import React, { useEffect } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../../redux/configStore';
import { LoginApi } from '../../redux/reducers/userReducer';

type Props = {}

export default function Login({ }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const { userToken } = useSelector((state: RootState) => state.userReducer);
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email không được để trống !")
        .email("email không đúng địng dạng !"),
      password: Yup.string()
        .required("password không được để trống !")
        .min(6, "phải từ 6 kí tự trở lên (bao gồm số và chữ cái)"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(LoginApi(values));
      // alert("đăng nhâp thành công");
    },
  });

  useEffect(() => {
    if (userToken !== "") {
      navigate("/profile");
    }
  }, [userToken]);

  return (
    <section style={{backgroundColor:"#f5f5f5"}}>
      <div className='container'>
        <div className="login-page">
          <div className="login-title">
            <h3>Login</h3>
          </div>
          <form className="loginForm" id="formLogin" onSubmit={frm.handleSubmit}>
            <div className="formlable">
              <div className="form-group  mb-3">
                <label htmlFor="floatingInput" style={{ fontSize: 20 }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={frm.values.email}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.email ? (
                  <span className="text-danger">{frm.errors.email}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="floatingPassword" style={{ fontSize: 20 }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  required
                  minLength={6}
                  value={frm.values.password}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.password ? (
                  <span className="text-danger">{frm.errors.password}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="navigate">
                <NavLink to="/register" className="register-now">
                  Register Now?
                </NavLink>
                <button className="btn-submit theme-btn" type="submit" id="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}