import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/configStore';
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProfileApi } from '../../redux/reducers/userReducer';
import OderHistory from '../../components/OderHistory/OderHistory';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type Props = {}

export interface Profile {
    email: string;
    password: string;
    gender: string;
    phone: string;
    name: string;
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}


export default function UserProfilePage({ }: Props) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    // console.log({userLogin});
    const form = useFormik({
        initialValues: {
            email: userLogin.email,
            password: "",
            gender: userLogin.gender,
            phone: userLogin.phone,
            name: userLogin.name,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("email không đúng định dạng!"),
            password: Yup.string()
                .min(8, "pass từ 8 - 12 ký tự!")
                .max(12, "pass từ 8 - 12 ký tự!"),
        }),
        onSubmit: (values) => {
            let { email, password, gender, phone, name } = values;
            let userUpdate = {
                ...userLogin,
                ...(email ? { email } : {}),
                ...(password ? { password } : {}),
                ...(gender === null || gender === undefined ? {} : { gender }),
                ...(phone ? { phone } : {}),
                ...(name ? { name } : {}),
            };

            //   dispatch(updateProfileApi(values));
        },
    });

    useEffect(() => {
        dispatch(getProfileApi());
    }, []);

    // antd

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
       
    ];

    return (
        <div className="profile py-4">
            <section className="profile-upper">
                <div className="profile-header mb-4">
                    <div className="container">
                        <h3>Profile</h3>
                    </div>
                </div>
                <div className="container">
                    <div className="profile-upper-form">
                        <form onSubmit={form.handleSubmit}>
                            <div className="row profile-content">
                                <div className="col-2  profile-avatar">
                                    <img src={userLogin?.avatar} alt="avatar" className="w-100 rounded-circle mt-2" />
                                </div>
                                <div className="col-10 profile-form">
                                    <div className="row profile-row profile-row-1">
                                        <div className="col-6 form-group">
                                            <label>Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder={userLogin?.email}
                                                className="form-control"
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                            />
                                            {/* {form.errors.email ? (
                          <span className="text-danger">{form.errors.email}</span>
                        ) : (
                          ""
                        )} */}
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder={userLogin?.name}
                                                className="form-control"
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                            />
                                            {/* {form.errors.name ? (
                          <span className="text-danger">{form.errors.name}</span>
                        ) : (
                          ""
                        )} */}
                                        </div>
                                    </div>
                                    <div className="row profile-row profile-row-2">
                                        <div className="col-6 form-group">
                                            <label>Phone</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                placeholder={userLogin?.phone}
                                                className="form-control"
                                                onChange={form.handleChange}
                                                onBlur={form.handleBlur}
                                            />
                                            {/* {form.errors.phone ? (
                          <span className="text-danger">{form.errors.phone}</span>
                        ) : (
                          ""
                        )} */}
                                        </div>
                                        <div className="col-6 form-group">
                                            <label>Password</label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="********"
                                                className="form-control"
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
                                    </div>
                                    <div className="row profile-row profile-row-3">
                                        <div className="col-6 form-group"></div>
                                        <div className="col-6 form-gender">
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
                                                <div className="gender-option1">
                                                    <div className="gender-click">
                                                        <input
                                                            defaultChecked={userLogin?.gender}
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
                                                            defaultChecked={!userLogin?.gender}
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
                                    <div className="button btn-profile">
                                        <div id="btnSubmit">
                                            <button
                                                type="submit"
                                                className="btn-submit theme-btn"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* <OderHistory />  */}
            <section className='favorite mt-5'>
                <div className='container'>
                    <div className='title-favorite'>
                        <h3>Favorite</h3>
                    </div>
                    <div className='table-favorite'>
                         <Table scroll={{ x: true}} columns={columns} dataSource={data} />
                    </div>
                </div>
            </section>
        </div>
    )
}