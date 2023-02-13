import { Badge } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/configStore'
import { ACCESS_TOKEN, getStore } from '../../util/setting'

type Props = {}

const waiting = require("../../assets/img/image3.png")

export default function HeaderLayout({ }: Props) {
  const {arrCart, productDetail} = useSelector((state: RootState) => state.productReducer)
  const navigate = useNavigate()
  const submitoder = () => {
    console.log(getStore(ACCESS_TOKEN));
    if (getStore(ACCESS_TOKEN) === null) {
      alert('Requires you to login!')
      return navigate('/login')
    }
    else {
      return navigate('/profile')
    }
  }
  return (
    <div className='header-shoe'>
      <div className='container'>
        <div className='wapper-header'>
          <div className='header-left'>
            <NavLink to="/home" className='logo'>
              <img src={waiting} alt="..." />
            </NavLink>
          </div>
          <div className='header-right'>
            <div className='user-interact'>
              {/* <div className='user-search'>
                <i className='fas fa-search'></i>
              </div> */}
              <div className='user-cart'>
                <NavLink to={`/cart/${productDetail.id}`}>
                  <Badge count={arrCart.length}>
                    <i className="fas fa-shopping-cart"></i>
                  </Badge>
                </NavLink>
              </div>
              <div className='user-login'>
                <a style={{cursor: 'pointer'}} onClick={() => {
                  submitoder()
                }}>
                  <i className='fas fa-user'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}