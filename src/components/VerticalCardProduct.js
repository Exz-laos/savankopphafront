import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayKIPCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import Context from '../context'
const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)


    const scrollElement = useRef()

    const {fetchUserAddToCart}  = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart() 
    }
//when this product will be added in the database then this function will be call

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    
    useEffect(()=>{
        fetchData()
    },[])
     
    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      
       <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'
        ref={scrollElement}>
         
            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'
                onClick={scrollLeft} >  <FaAngleLeft/>  
            </button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' 
                 onClick={scrollRight}>  <FaAngleRight/>
            </button> 
        {  
           loading ? (
            loadingList.map((product,index)=>{
                return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] 
                    md:max-w-[320px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-56 p-4 min-w-[280px] md:min-w-[145px] 
                     flex justify-center items-center animate-pulse'>
                    </div>
                    <div className='p-4 grid w-full gap-2'>
                      <h2 className='p-1 py-2 bg-slate-200 animate-pulse rounded-full'> </h2>
                         
                      <p className='p-1 py-1 w-40 bg-slate-200 animate-pulse rounded-full'></p>
                            <div className='flex'>
                                <p className='bg-slate-200 w-full h-4 animate-pulse rounded-full'></p>
                                  
                                <p className=' bg-slate-200 w-full h-2 animate-pulse rounded-full'></p>
                                 
                            </div>
                            <button className=' py-3 rounded-full bg-slate-200 animate-pulse' >
        
                            </button>
                    </div>
  
                </div>
                )
            })
           ):(
            data.map((product,index)=>{
                return (
                <Link to={"product/" + product?._id} 
                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] 
                    md:max-w-[320px] bg-white rounded-sm shadow'>   
                     <div className='relative bg-slate-200 h-56 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                    <img
                      src={product.productImage[0]}
                      className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'
                      alt='Product'
                    />
                
                  </div>
                  
                  <div className='lao-text p-4 grid gap-3'>
                    <div className='flex items-center gap-2'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                        {product?.productName}
                      </h2>
                    </div>
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div>
                    <div className='flex'>
                      <p className='text-2xl text-yellow-700 font-medium'>
                        {displayKIPCurrency(product?.sellingPrice)}
                      </p>
                      <p className='text-base text-slate-500 line-through px-3 py-4'>
                        {displayKIPCurrency(product?.price)}
                      </p>
                  
                    </div>
                    <p className='lao-text text-xs text-lime-600'>ພ້ອມສົ່ງ: {product?.quantity} ອັນ</p>
                    </div>
                  
                  
                 
                    <button
                      className='text-sm bg-yellow-500 hover:bg-yellow-700 text-black px-3 py-0.5 rounded-full'
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      ເພີ່ມເຂົ້າກະຕ່າ
                    </button>
                  </div>
                  
                 

  
                </Link>
                )
            })
           )

           
        }
       </div>
    
    </div>
  )
}

export default VerticalCardProduct