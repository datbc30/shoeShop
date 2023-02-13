import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableCart from '../../components/CardProduct/TableCart'
import { AppDispatch, RootState } from '../../redux/configStore'
import { clearCart } from '../../redux/reducers/productReducer'
import { submitOrderApi } from '../../redux/reducers/userReducer'
import { ACCESS_TOKEN, getStore } from '../../util/setting'

type Props = {}

export interface ProductCart {
  id: number;
  name: string;
  price: number;
  quantityBuy: number;
  image:string;
}

export default function Cart({}: Props) {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const { arrCart } = useSelector((state: RootState) => state.productReducer ) 
    console.log({arrCart});

    const clear = () => {
      dispatch(clearCart(arrCart))
    }

    const submitoder = () => {
      console.log(getStore(ACCESS_TOKEN));
      if (getStore(ACCESS_TOKEN) === null) {
        alert('Requires you to login!')
        return navigate('/login')
        
      }
      else {
        alert('Successful order submission')
        return navigate('/home')
      }
    }
    
  return (
    <section className="cart_detail">
    <div className="container">
      <h1 className="cart_detail-title mb-4 text-center">Carts</h1>
      <TableCart />
      <div className="text-end mt-3">
        <button
          className="btn theme-btn"
          onClick={() => {
            submitoder()
            dispatch(submitOrderApi(arrCart))
            setTimeout(() => {
              clear()
            },1000)
          }}
        >
          Submit order
        </button>
      </div>
    </div>
  </section>
  )
}