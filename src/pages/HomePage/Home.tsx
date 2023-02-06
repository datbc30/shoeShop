import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/CardProduct/CardProduct'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getProductApi, ProductModel } from '../../redux/reducers/productReducer'
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom'

type Props = {}



const contentStyle: React.CSSProperties = {
  height: 'auto',
  color: '#fff',
  // lineHeight: '160px',
  // textAlign: 'center',
  // background: '#364d79',
};

export default function Home({ }: Props) {
  const { arrProduct, store } = useSelector((state: RootState) => state.productReducer)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const actionThuk = getProductApi()
    dispatch(actionThuk)
  }, [])



  const renderProduct = () => {
    return arrProduct.map((item: ProductModel, index: number) => {
      return <div className='col-lg-4 col-md-6' key={index} onClick={() => {
        navigate(`/detail/${item.id}`)
      }}>
        <Card product={item} />
      </div>
    })
  }

  return (
    <div className='home-page'>
      <div className='conten'>
        <div className='home-wapper'>
          <div className='home-top'>
            <div className='home-top-title'>
              <h2 className='text-center'>Shoes Shop</h2>
            </div>
            <div className='carousel-home mt-2 mb-2'>
              <Carousel autoplay>
                <div className='slider-background'>
                  <div style={contentStyle}>
                    <div className='slider-background-wapper'>
                      <img src="https://shop.cyberlearn.vn/images/store1.jpg" alt="..." />
                      <div className='wapper-left'>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='slider-background2'>
                  <div style={contentStyle}>
                    <div className='slider-background-wapper'>
                      <img src="https://shop.cyberlearn.vn/images/store2.jpg" alt="..." />
                      <div className='wapper-left'>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='slider-background3'>
                  <div style={contentStyle}>
                    <div className='slider-background-wapper'>
                      <img src="https://shop.cyberlearn.vn/images/store3.jpg" alt="..." />
                      <div className='wapper-left'>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
          <div className='home-bottom'>
            <div className='container'>
              <div className='home-bottom-title'>
                <h2 className='text-center mt-4 mb-2'>Our Product</h2>
              </div>
              <div className='row'>
                {renderProduct()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}