// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { Link } from 'react-router-dom'
// const CategoryList = () => {
//     const [categoryProduct,setCategoryProduct] = useState([])
//     const [loading,setLoading] = useState(false)

//     const categoryLoading = new Array(13).fill(null)

//     const fetchCategoryProduct = async() =>{
//         setLoading(true)
//         const response = await fetch(SummaryApi.categoryProduct.url)
//         //no need pass method because default is get method
//         const dataResponse = await response.json()
//         setLoading(false)
//         setCategoryProduct(dataResponse.data)
//     }

//     useEffect(()=>{
//         fetchCategoryProduct()
//     },[])
//   return (
//     <div className='container mx-auto p-4'>
//            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
//             {
//                 loading ? (

//                          categoryLoading.map((el,index)=>{
//                             return(
//                                 <div className='h-16 w-16 md:w-20 md:h-20 rounded-full 
//                                 overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
//                                 </div>
//                             )
//                     })  
//                 ) : 
//                 (
//                     (
//                         categoryProduct.map((product,index)=>{
//                             return(
//                                 <Link to={"/product-category?category="+product?.category} className='cursor-pointer'
//                                 key={product?.category}>
//                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full 
//                                     overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
//                                         <img src={product?.productImage[0]} alt={product?.category} 
//                                       className='h-full object-scale-down mix-blend-multiply 
//                                         hover:scale-125 transition-all'/>
//                                     </div>
//                                       <p className='text-center text-sm md:text-base capitalize'>    
//                                         {product?.category}           
//                                       </p>
    
//                                 </Link>
                                 
//                             )
//                         })
//                     )
//                 )
//             }
//            </div>
        
//     </div>
//   )
// }

// export default CategoryList


// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import { Link } from 'react-router-dom';

// const CategoryList = () => {
//     const [categoryProduct, setCategoryProduct] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const categoryLoading = new Array(13).fill(null);

//     const fetchCategoryProduct = async () => {
//         setLoading(true);
//         const response = await fetch(SummaryApi.categoryProduct.url);
//         const dataResponse = await response.json();
//         setLoading(false);
//         setCategoryProduct(dataResponse.data);
//     };

//     useEffect(() => {
//         fetchCategoryProduct();
//     }, []);

//     return (
//         <div className='container mx-auto p-4'>
//             <div className='flex items-center justify-center overflow-x-auto scrollbar-none'>
//                 <div className='flex items-center gap-4'>
//                     {loading ? (
//                         categoryLoading.map((el, index) => (
//                             <div
//                                 className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
//                                 key={"categoryLoading" + index}
//                             ></div>
//                         ))
//                     ) : (
//                         categoryProduct.map((product, index) => (
//                             <Link
//                                 to={"/product-category?category=" + product?.category}
//                                 className='flex flex-col items-center cursor-pointer'
//                                 key={product?.category}
//                             >
//                                 <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
//                                     <img
//                                         src={product?.productImage[0]}
//                                         alt={product?.category}
//                                         className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
//                                     />
//                                 </div>
//                                 <p className='text-center text-sm md:text-base capitalize mt-2'>
//                                     {product?.category}
//                                 </p>
//                             </Link>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryList;



import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='lao-text relative'>
            {/* Desktop View */}
            
            <div className='hidden md:flex items-center justify-center gap-4 overflow-x-auto scrollbar-none'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}></div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link to={"/product-category?category=" + product?.category} className='cursor-pointer text-center' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <p className='text-sm md:text-base capitalize mt-1'>{product?.category}</p>
                        </Link>
                    ))
                )}
            </div>

            {/* Mobile View */}
            <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-xl p-2 flex items-center gap-2'>
    <FaBars />
    <span className='inline'>ເບິ່ງສິນຄ້າ</span>
</button>

                {menuOpen && (
                    <div className='fixed inset-0 top-14 bg-white border-t border-gray-300 z-10 overflow-y-auto'>
                        <div className='relative w-full max-w-md mx-auto p-4'>
                            <button onClick={toggleMenu} className='absolute top-4 right-4 text-2xl'>
                                <FaTimes /> 
                            </button>
                            <div className='mt-12'>
                                {loading ? (
                                    categoryLoading.map((_, index) => (
                                        <div className='p-4 bg-slate-200 animate-pulse' key={"categoryLoading" + index}></div>
                                    ))
                                ) : (
                                    categoryProduct.map((product) => (
                                        <div className='p-4 border-b' key={product?.category}>
                                            <Link to={"/product-category?category=" + product?.category} className='flex items-center gap-4'>
                                                <img src={product?.productImage[0]} alt={product?.category} className='w-16 h-16 rounded-full object-cover'/>
                                                <p className='text-base capitalize'>{product?.category}</p>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;




