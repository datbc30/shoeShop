import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getProductDetailApi, RelatedProduct, ProductDetail, addToCart } from '../../redux/reducers/productReducer'
import { Rate } from 'antd';


type Props = {}


export default function Detail({ }: Props) {
    const { productDetail } = useSelector((state: RootState) => state.productReducer)
    // console.log({ productDetail });
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()

    const [quantityBuy, setQuantityBuy] = useState(0);
    const addQuantityBuy = () => {
        setQuantityBuy(quantityBuy + 1);
    };
    const subtractQuantityBuy = () => {
        setQuantityBuy(quantityBuy - 1);
    };



    useEffect(() => {
        let { id } = params
        const action = getProductDetailApi(+(id || 0))
        dispatch(action)
        console.log({ params });
    }, [params.id]);

    const renderRealate = () => {
        return productDetail.relatedProducts?.map((prod: RelatedProduct, index: number) => {
            return (
                <div className='col-lg-4 col-md-6' key={index}>
                    <div className='card mt-3 mb-3' >
                        <img src={prod.image} alt={prod.name} />
                        <div className='card-body'>
                            <h4>{prod.name}</h4>
                            <p>{prod.price}$</p>
                            <p>{prod.description.slice(0, 30) + `...`}</p>
                            <Rate disabled defaultValue={4.5} />
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='detail-page'>
            <div className='container'>
                <div className='detail-wapper'>
                    <div className='detail-title'>
                        <h2 className='text-center'>Details Product</h2>
                    </div>
                    <div className='detail-product mt-3 mb-3'>
                        <div className='product-wapper'>
                            <div className='product-box-wapper'>
                                <div className='left'>
                                    <div className='left-img'>
                                        <img src={productDetail.image} alt="..." />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='name'>
                                        <h4>{productDetail.name}</h4>
                                    </div>
                                    <div className='description'>
                                        <p>{productDetail.description}</p>
                                    </div>
                                    <div className='size'>
                                        <p>Size:</p>
                                    </div>
                                    <div className='size1'>
                                        {productDetail.size?.map((item: any, index: number) => {
                                            return <div className='size-btn me-2' key={index}>
                                                <button className='theme-btn'>{item}</button>
                                            </div>
                                        })}
                                    </div>
                                    <div className='price'>
                                        <span>Price: {productDetail.price}$</span>
                                    </div>
                                    <div className='chan-quantity'>
                                        <div className='input-quantity'>
                                            <input type="button" value="+" className='qty-btn' onClick={addQuantityBuy} />
                                            <input type="text" id='quantity' name='quantity' value={quantityBuy} min={1} className="quantity-selecter" />
                                            <input type="button" value="-" className='qty-btn' onClick={subtractQuantityBuy} />
                                        </div>
                                    </div>
                                    <div className='button-add'>
                                        <button className='theme-btn' onClick={() => {
                                            dispatch(
                                                addToCart({
                                                    id: productDetail.id,
                                                    name: productDetail.name,
                                                    price: productDetail.price,
                                                    quantityBuy:quantityBuy,
                                                    image: productDetail.image
                                                })
                                            );
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='detail-relatedproducts'>
                        <div className='relatedproducts-title'>
                            <h2 className='text-center'>Realate Product</h2>
                        </div>
                        <div className='relatedproducts-item'>
                            <div className='row'>
                                {renderRealate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}