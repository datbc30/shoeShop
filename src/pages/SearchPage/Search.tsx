import { Rate } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getProductSearchApi } from '../../redux/reducers/productReducer'

type Props = {}

export default function Search({ }: Props) {
    const { arrProductSearch } = useSelector((state: RootState) => state.productReducer)
    const dispatch: AppDispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    console.log({searchParams});
    // const keyword: string | null = searchParams.get("keyword");
    const [keyword,setKeyword] = useState( searchParams.get("keyword") || '')
    console.log({keyword});
    
    let keywordRef = useRef("");
    const navigate = useNavigate()
    const handleChange = (e: any) => {
        const getAllProductSearch = getProductSearchApi(e.target.value)
        dispatch(getAllProductSearch)

        setKeyword(e.target.value)
        keywordRef.current = e.target.value;

    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const getAllProductSearch = getProductSearchApi(keyword)
        dispatch(getAllProductSearch)
    };

    const removeAccents = (str: string) => {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ",
            "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ",
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    };
    let newSearchArr = [];
    if (keyword) {
        let newKeyword: string = removeAccents(keyword).replace(/\s/g, "");
        for (let item of arrProductSearch) {
            let newItem: string = removeAccents(item.name).replace(/\s/g, "");
            if (newItem.toLowerCase().includes(newKeyword.toLowerCase().trim())) {
                newSearchArr.push(item);
            }
        }
    }
    useEffect(() => {

        const getAllProductSearch = getProductSearchApi(keyword)
        dispatch(getAllProductSearch)
    }, [])

    return (
        <div className="container py-4">
            <div>
                <h1>
                    Tìm thấy {newSearchArr.length} sản phẩm liên quan đến{" "}
                    {keyword?.toUpperCase()}
                </h1>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Tìm Kiếm"
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <button className="btn text-center" style={{ background: '#002333', color: '#fff' }} type="submit" >
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            <div className='row'>
                <div className='col-lg-4 col-md-6'>
                    {newSearchArr?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="card mt-3 mb-3">
                                <a>
                                    <i className="far fa-heart"></i>
                                </a>
                                <img src={item.image} alt={item.name} onClick={() => {
                                    navigate(`/detail/${item.id}`)
                                }} />
                                <div className='card-body'>
                                    <h4>{item.name}</h4>
                                    <p>{item.price}$</p>
                                    <p>{item.description.slice(0, 30) + `...`}</p>
                                    <Rate disabled defaultValue={4.5} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}