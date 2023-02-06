import React from 'react'
import { useSelector } from 'react-redux'
import TableCart from '../../components/CardProduct/TableCart'
import { RootState } from '../../redux/configStore'

type Props = {}

export default function Cart({}: Props) {
    const { arrCart } = useSelector((state: RootState) => state.productReducer )
    console.log({arrCart});
    
  return (
    <section className="cart_detail">
    <div className="container">
      <h1 className="cart_detail-title">Carts</h1>
      <TableCart />
      <div className="text-end">
        <button
          className="btn cart_detail-btn"
        >
          Submit order
        </button>
      </div>
    </div>
  </section>
  )
}