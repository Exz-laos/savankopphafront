import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListinArray = urlSearch.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true;
    });

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });

        const dataResponse = await response.json();
        setData(dataResponse?.data || []);
    };

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;

        setSelectCategory(prev => ({
            ...prev,
            [value]: checked
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).filter(categoryKeyName => selectCategory[categoryKeyName]);

        setFilterCategoryList(arrayOfCategory);

        const urlFormat = arrayOfCategory.map((el, index) => `category=${el}${index < arrayOfCategory.length - 1 ? '&&' : ''}`);

        navigate("/product-category?" + urlFormat.join(""));
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target;

        setSortBy(value);

        if (value === 'asc') {
            setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
        }

        if (value === 'dsc') {
            setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
        }
    };

    return (
        <div className='container lao-text mx-auto p-4'>
            {/* Desktop version */}
            <div className='hidden lg:grid grid-cols-[200px,1fr] gap-4'>
                {/* Left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                    {/* Sort by */}
                    <div className='mb-4'>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>ລຽງຕາມລາຄາ</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input
                                    type='radio'
                                    name='sortBy'
                                    checked={sortBy === 'asc'}
                                    onChange={handleOnChangeSortBy}
                                    value="asc"
                                />
                                <label>ລາຄາ - ຖືກ ຫາ ແພງ</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input
                                    type='radio'
                                    name='sortBy'
                                    checked={sortBy === 'dsc'}
                                    onChange={handleOnChangeSortBy}
                                    value="dsc"
                                />
                                <label>ລາຄາ - ແພງ ຫາ ຖືກ</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter by */}
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>ປະເພດ</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {productCategory.map((categoryName, index) => (
                                <div className='flex items-center gap-3' key={index}>
                                    <input
                                        type='checkbox'
                                        name="category"
                                        checked={selectCategory[categoryName?.value] || false}
                                        value={categoryName?.value}
                                        id={categoryName?.value}
                                        onChange={handleSelectCategory}
                                    />
                                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Right side (product) */}
                <div className='px-4'>
                    <p className='font-medium text-slate-800 text-lg my-2'>ຜົນການຄົ້ນຫາ : {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll'>
                        {data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading} />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className='lg:hidden'>
                {/* Sort and Filter */}
                <div className='bg-white p-4 mb-4'>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>ລຽງຕາມລາຄາ</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                            <input
                                type='radio'
                                name='sortBy'
                                checked={sortBy === 'asc'}
                                onChange={handleOnChangeSortBy}
                                value="asc"
                            />
                            <label>ລາຄາ - ຖືກ ຫາ ແພງ</label>
                        </div>
                        <div className='flex items-center gap-3'>
                            <input
                                type='radio'
                                name='sortBy'
                                checked={sortBy === 'dsc'}
                                onChange={handleOnChangeSortBy}
                                value="dsc"
                            />
                            <label>ລາຄາ - ແພງ ຫາ ຖືກ</label>
                        </div>
                    </form>

                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 mt-4'>ປະເພດ</h3>
                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {productCategory.map((categoryName, index) => (
                            <div className='flex items-center gap-3' key={index}>
                                <input
                                    type='checkbox'
                                    name="category"
                                    checked={selectCategory[categoryName?.value] || false}
                                    value={categoryName?.value}
                                    id={categoryName?.value}
                                    onChange={handleSelectCategory}
                                />
                                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                            </div>
                        ))}
                    </form>
                </div>

                {/* Product List */}
                <div>
                    <p className='font-medium text-slate-800 text-lg my-2'>ຜົນການຄົ້ນຫາ : {data.length}</p>
                    <div className='overflow-y-scroll'>
                        {data.length !== 0 && !loading && (
                            <VerticalCard data={data} loading={loading} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
