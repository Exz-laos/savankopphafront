import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayKIPCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data || []);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className='lao-text container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center gap-4 overflow-x-scroll scrollbar-none transition-all'>
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div className='w-full min-w-[280px] max-w-[280px] bg-white rounded-sm shadow' key={index}>
                                <div className='bg-slate-200 h-56 p-4 min-w-[280px] flex justify-center items-center animate-pulse'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='p-1 py-2 bg-slate-200 animate-pulse rounded-full'> </h2>
                                    <p className='p-1 py-1 w-40 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex'>
                                        <p className='bg-slate-200 w-full h-4 animate-pulse rounded-full'></p>
                                        <p className='bg-slate-200 w-full h-2 animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='py-3 rounded-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.length === 0 ? (
                            <div className='w-full text-center py-4'>
                                <p className='text-gray-500'>No products available</p>
                            </div>
                        ) : (
                            data.map((product) => (
                                <Link to={"/product/" + product?._id}
                                    className='lao-text w-full min-w-[280px] max-w-[280px] bg-white rounded-sm shadow' 
                                    onClick={scrollTop} key={product._id}>
                                    <div className='bg-slate-200 h-56 p-4 min-w-[280px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} 
                                            className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                            {product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex'>
                                            <p className='text-2xl text-yellow-600 font-medium'>
                                                {displayKIPCurrency(product?.sellingPrice)}</p>
                                            <p className='text-base text-slate-500 line-through px-3 py-4'>
                                                {displayKIPCurrency(product?.price)}</p>
                                        </div>
                                        <p className='lao-text text-xs text-lime-600'>ພ້ອມສົ່ງ: {product?.quantity} ອັນ</p>
                                        <button
                                            className='text-sm bg-yellow-500 hover:bg-yellow-700 text-black px-3 py-0.5 rounded-full'
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            ເພີ່ມເຂົ້າກະຕ່າ
                                        </button>
                                    </div>
                                </Link>
                            ))
                        )
                    )
                }
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;
