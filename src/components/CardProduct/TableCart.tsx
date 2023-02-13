import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { remoteFormCart } from '../../redux/reducers/productReducer';


type Props = {}

export default function TableCart({ }: Props) {
    const { arrCart } = useSelector((state: RootState) => state.productReducer);
    const dispatch: AppDispatch = useDispatch();
    
    interface DataType {
        key: any;
        id:number;
        name: string;
        image: string;
        price: number;
        quantityBuy: any;
      }
    
      const columns: ColumnsType<DataType> = [
        {
          title: 'image',
          dataIndex: 'image',
          key: 'image',
          render: (imgSrc) => {
            return <img src={imgSrc} width={85} height={85} alt="..." />;
          },
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'quantityBuy',
          key: 'quantityBuy',
          dataIndex: 'quantityBuy',
         
        },
        {
          title: 'Action',
          dataIndex:'id',
          key: 'id',
          render: (id) => {
            return (
              <div>
                <button className='btn action-delete'
                        style={{backgroundColor: 'rgb(204 204 204)'}}
                        onClick={() => {
                          console.log({id});
                            dispatch(remoteFormCart(id))
                        }}
                >Delete</button>
              </div>
            )
          }
        },
      ];
      
      let dataArr: DataType[] = [];
    //   console.log({arrCart});
    //   console.log({daynemay:arrCart[0][0]});
    //   console.log({dayneba:arrCart[0]['name']});
      dataArr = arrCart.map((e:any,index:number) => ({
          key: index,
          id: e.id,
          image: e.image,
          name: e.name,
          price: e.price,
          quantityBuy: e.quantityBuy
      }))
      console.log({dataArr});

  return (
    <Table scroll={{ x: true}} columns={columns} dataSource={dataArr} />
    )
}