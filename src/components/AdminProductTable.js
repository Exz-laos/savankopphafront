import React, { useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdCheckCircle, MdCancel, MdDelete } from 'react-icons/md';
import displayKIPCurrency from '../helpers/displayCurrency';
import AdminEditProduct from './AdminEditProduct';
import Swal from 'sweetalert2';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

const AllProductTable = ({
  onClose,
  data,
  fetchdata, // Ensure fetchdata is passed from the parent component
}) => {
  const [editProduct, setEditProduct] = useState(null); // Store the product being edited
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleDeleteProduct = async () => {
    const productId = data._id;

    if (!productId) {
      console.error("Product ID is not available.");
      toast.error("Product ID is not available.");
      return;
    }

    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${SummaryApi.deleteProduct.url}/${productId}`, {
          method: SummaryApi.deleteProduct.method,
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your product has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            willClose: () => {
              fetchdata(); // Fetch the updated product data
            }
          });
        } else {
          throw new Error(responseData.message || "Unknown error");
        }
      } catch (error) {
        console.error("Delete product error:", error.message || error);
        Swal.fire({
          title: 'Error!',
          text: `Error deleting product: ${error.message || "Unknown error"}`,
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }
  };

  return (
    <>
      <tr key={data._id} className="lao-text first-line:border border-gray-200">
        <td className='border border-yellow-700 w-20 h-20 p-2'>
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="w-20 h-20 object-cover"
            onClick={() => {
              setOpenFullScreenImage(true);
              setFullScreenImage(data?.productImage[0]);
            }}
          />
        </td>
        <td className="border bg-yellow-200 border-yellow-700 p-2 truncate w-20 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {data?.productName}
        </td>
        <td className='border border-yellow-700 p-2 text-center'>{data?.category}</td>
        <td className='border border-yellow-700 p-2 text-center'>{displayKIPCurrency(data.sellingPrice)}</td>
        <td className='border border-yellow-700 p-2 text-center'>{data?.quantity}</td>
        <td className='border border-yellow-700 p-2 text-center items-center'>
          <div className='flex justify-center'>
            {data?.available ? 
               <MdCheckCircle className="text-green-500 text-3xl " /> 
               : 
               <MdCancel className="text-red-500 text-3xl" />}
          </div>
        </td>
        <td className='border border-yellow-700 p-2 text-center'>
          <div className='flex justify-center gap-4'>
            <button
              className='w-fit p-3 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer text-xl'
              onClick={() => setEditProduct(data)}>
              <MdModeEdit />
            </button>
            <button
              className='w-fit p-3 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer text-xl'
              onClick={handleDeleteProduct}>
              <MdDelete />
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <AdminEditProduct
            productData={editProduct}
            onClose={() => setEditProduct(null)} // Properly passed as a function
            fetchdata={fetchdata}
          />
        </div>
      )}

      {/* Display image fullscreen */}
      {openFullScreenImage && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        </div>
      )}
    </>
  );
};

export default AllProductTable;
