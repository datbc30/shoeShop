import React from 'react'
import { ProductModel } from '../../redux/reducers/productReducer'
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, getStore } from '../../util/setting';
import { AppDispatch } from '../../redux/configStore';
import { useDispatch } from 'react-redux';

type Props = {
    product: ProductModel
}

export default function Card({ product }: Props) {
    const navigate = useNavigate()

    return (
        <div className='card mt-3 mb-3'>
            <a>
                <i className="far fa-heart"></i>
            </a>
            <img src={product.image} alt={product.name} onClick={() => {
                navigate(`/detail/${product.id}`)
                setTimeout(() => {
                    console.log("aaa");
                    
                },3000)
            }} />
            <div className='card-body'>
                <h4>{product.name}</h4>
                <p>{product.price}$</p>
                <p>{product.description.slice(0, 30) + `...`}</p>
                <Rate disabled defaultValue={4.5} />
            </div>
        </div>
    )
}