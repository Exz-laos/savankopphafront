import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AllProductTable from '../components/AdminProductTable';
import { TfiFullscreen } from "react-icons/tfi";
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);






  

  return (
    <div className='userTable  '>
    <div className='lao-text bg-yellow-700 py-2 px-4 flex justify-between items-center'>
    <h2 className='font-bold text-lg text-slate-100'>ສິນຄ້າທັງໝົດ</h2>
    <div className='flex space-x-2'> {/* Add this wrapper with space-x-2 */}
      <button
        className='lao-text bg-blue-500 border-2 border-blue-600 text-slate-100 hover:bg-blue-600
          hover:text-white transition-all py-1 px-3 rounded-full'
        onClick={() => setOpenUploadProduct(true)}
      >
        <p className='font-extrabold'>+ ເພີ່ມສິນຄ້າ</p>
      </button>
      <button
        className="p-2 rounded cursor-pointer hover:bg-gray-300"
        onClick={() => document.querySelector('.userTable').classList.toggle('fullscreen')}
      >
        <TfiFullscreen />
      </button>
    </div>
  </div>

      {/* All product table */}
      <div className='py-4 h-[calc(100vh-18px)] overflow-y-auto'>

        <table className='w-full  border-collapse table-auto'>
          <thead>
            <tr className='bg-yellow-700 text-slate-100'>
              <th className='lao-text border border-gray-200 p-2 w-5'>ຮູບພາບ</th>
              <th className='lao-text border border-gray-200 p-2'>ຊື່ສິນຄ້າ</th>
              <th className='lao-text border border-gray-200 p-2'>ປະເພດ</th>
              <th className='lao-text border border-gray-200 p-2'>ລາຄາຂາຍ</th>
              <th className='lao-text border border-gray-200 p-2'>ພ້ອມສົ່ງ</th>
              <th className='lao-text border border-gray-200 p-2'>ສະຖານະ</th>
              <th className='lao-text border border-gray-200 p-2'>ແກ້ໄຂ</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product, index) => (
              <AllProductTable data={product} key={product._id} fetchdata={fetchAllProduct} />
            ))}
          </tbody>
        </table>
      </div>





      {/* Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>






  );
};

export default AllProducts;
