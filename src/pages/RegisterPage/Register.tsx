import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { AppDispatch } from '../../redux/configStore';
import { registerApi } from '../../redux/reducers/userReducer';

type Props = {}

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate()
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      gender:"",
      name: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email cannot be empty!")
        .email("Email invalidate !"),
      password: Yup.string().required("password cannot be empty!"),
      passwordConfirm: Yup.string().required("password cannot be empty!"),
      name: Yup.string().required("name cannot be empty!"),
      phone: Yup.string().required("phone cannot be empty!"),
    }),
    onSubmit: (values) => {
      console.log({values});
      let action = registerApi(values);
      dispatch(action);
    }
  });
  return (
    <div>
       <section className="register">
          <div className="container">
            <div className="row content-register">
              <div className="col-10 mx-auto detail-register">
                <h3 className="text-left display-6 text-dark fs-1 text-center">Register</h3>
                {/* <hr /> */}
                <form id="formRegister" onSubmit={form.handleSubmit}>
                  <div className="row register-item">
                    <div className="col-lg-6 col-mb-8 col-sm-12 form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="email"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.email ? (
                        <span className="text-danger">{form.errors.email}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-6 col-mb-8 col-sm-12 form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}

                      />
                      {form.errors.name ? (
                        <span className="text-danger">{form.errors.name}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row register-item">
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.password ? (
                        <span className="text-danger">
                          {form.errors.password}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="phone"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}

                      />
                      {form.errors.phone ? (
                        <span className="text-danger">{form.errors.phone}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row register-item">
                    <div className="col-lg-6 col-sm-12 form-group">
                      <label>Password confirm</label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="password confirm"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      {form.errors.passwordConfirm ? (
                        <span className="text-danger">
                          {form.errors.passwordConfirm}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12 form-gender">
                      <div id="gender-content">
                        <div className="gender-option">
                          <p
                            style={{
                              fontSize: 18,
                              fontWeight: 500,
                              paddingRight: "20px",
                              display: "inline-block",
                              color: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            Gender
                          </p>
                        </div>
                        <div className="gender-option">
                          <div className="gender-click">
                            <input
                              defaultChecked={true}
                              type="radio"
                              name="gender"
                              onChange={() =>
                                form.setFieldValue("gender", true)
                              }
                            />
                            <br />
                            <label className="label-title">Male</label>
                          </div>
                          <div className="gender-click">
                            <input
                              type="radio"
                              name="gender"
                              onChange={() =>
                                form.setFieldValue("gender", false)
                              }
                            />
                            <br />
                            <label className="label-title">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button mt-4 mb-4">
                    <div id="btnSubmit">
                      <button type="submit" className="btn-submit theme-btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}