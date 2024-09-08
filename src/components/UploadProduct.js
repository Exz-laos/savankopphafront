import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const UploadProduct = ({
    onClose,
    fetchData
    
}) => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [], //because need to upload multiple images
        description : "",
        price : "",
        sellingPrice : "",
        quantity: "",
        available:true,
      })


      const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
      const [fullScreenImage,setFullScreenImage] = useState("")
  

 

    const handleOnChange = (e) => {
      const { name, type, checked, value } = e.target;
    
      setData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
    

    const handleDescriptionChange = (value) => {
      setData((prev) => ({
        ...prev,
        description: value,
      }));
    };

    const handleUploadProduct = async(e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve)=>{
            return{
              ...preve,
              productImage : [ ...preve.productImage, uploadImageCloudinary.url]
            }
          })
      }


      const handleDeleteProductImage = async(index)=>{
        console.log("image index",index)
        
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
    
        setData((preve)=>{
          return{
            ...preve,
            productImage : [...newProductImage]
          }
        })
        
      }


       {/**upload product */}
       const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
      
          const responseData = await response.json();
      
          if (response.ok && responseData.success) {
            Swal.fire({
              title: 'ສຳເລັດ!',
              text: responseData.message,
              icon: 'success',
              timer: 1000, // Auto-close after 2 seconds
              showConfirmButton: false, // Hide the confirm button
              willClose: () => {
                onClose(); // Close the modal or perform any other action
                fetchData(); // Fetch updated data
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: responseData.message || 'Failed to upload the product.',
              icon: 'error',
              timer: 2000, // Auto-close after 2 seconds
              showConfirmButton: false // Hide the confirm button
            });
          }
        } catch (error) {
          console.error('Upload product error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while uploading the product.',
            icon: 'error',
            timer: 2000, // Auto-close after 2 seconds
            showConfirmButton: false // Hide the confirm button
          });
        }
      };




  return (
    <div className='lao-text fixed w-full h-full bg-gray-500 bg-opacity-60
         top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
      <div  className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>ເພີ່ມສິນຄ້າ</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onClose} >
                    <CgClose/>
                </div>
            </div>

            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                 <label htmlFor='productName'>ຊື່ສິນຄ້າ :</label>
                 <input 
                    type='text' 
                    id='productName' 
                    placeholder='ກະລຸນາກອກຊື່ສິນຄ້າ' 
                    name='productName'
                    value={data.productName} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                 />
                 {/* brandName */}
                 <label htmlFor='brandName' className='mt-3'>ຊື່ແບນ ຫຼື ຍີ່ຫໍ່ :</label>
                    <input 
                    type='text' 
                    id='brandName' 
                    placeholder='ກະລຸນາກອກຊື່ແບນ ຫຼື ຍີ່ຫໍ່' 
                    value={data.brandName} 
                    name='brandName'
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded'
                    required
                    />
                {/* category */}
                  <label htmlFor='category' className='mt-3 '>ປະເພດສິນຄ້າ :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} 
                            className='p-2 bg-slate-100 border rounded'>
                     <option value={""}>ເລືອກປະເພດສິນຄ້າ</option>
                       {
                          productCategory.map((el,index)=>{
                            return(
                              <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                          })
                       }        
                    </select>
                    
                {/* Product Image */}
                <label htmlFor='productImage' className='mt-3'>ຮູບພາບສິນຄ້າ :</label>
                 <label htmlFor='uploadImageInput'>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full flex 
                    justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                            <span className='text-4xl'><FaCloudUploadAlt/></span>
                            <p className='text-sm'>ເພີ່ມຮູບພາບ</p>
                            <input type='file' id='uploadImageInput'  className='hidden' 
                                onChange={handleUploadProduct}   />
                            </div>
                    </div>
                 </label> 
                 <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='bg-slate-100 border cursor-pointer'  
                                        onClick={()=>{
                                            setOpenFullScreenImage(true)
                                            setFullScreenImage(el)
                                          }}
                                       
                                  />
                                        <div className='absolute bottom-0 right-0 p-1 text-white
                                         bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                                         onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*ກະລຸນາເພີ່ມຮູບພາບສິນຄ້າທີ່ຈະສະແດງເທິງໜ້າຮ້ານ</p>
                    )
                  }
                  
              </div>

                {/* Price */}
              <label htmlFor='price' className='mt-3'>ລາຄາປົກກະຕິ :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='ກະລຸນາກອກລາຄາສິນຄ້າ' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />
              {/* sellingPrice */}
              <label htmlFor='sellingPrice' className='mt-3'>ລາຄາຂາຍໜ້າເວັບ :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='ກະລຸນາກອກລາຄາຂາຍຂອງສິນຄ້າ' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />
                {/* description */}

            
          
               <label htmlFor='description' className='mt-3'>ຂໍ້ມູນສິນຄ້າ :</label>
              <div className='lao-text'>
                <ReactQuill
                  value={data.description}
                  onChange={handleDescriptionChange}
                  className='h-28 bg-slate-100 border resize-none p-1 lao-text'
                  placeholder='ກະລຸນາກອກຂໍ້ມູນສິນຄ້າ'

                />
              </div>


     
               {/* quantity */}
              <label htmlFor='quantity' className='mt-3 lao-text'>ຈຳນວນສິນຄ້າ :</label>
              <input 
                type='number' 
                id='quantity' 
                placeholder='ກະລຸນາກອກຈຳນວນສິນຄ້າພ້ອມສົ່ງ' 
                value={data.quantity} 
                name='quantity'
                onChange={handleOnChange}
                className='lao-text p-2 bg-slate-100 border rounded'
                required
              />
       

                    <label htmlFor='available' className='mt-3 lao-text'>ສະຖານະ:</label>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        id='available'
                        name='available'
                        checked={data.available}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                      />
                      <span className='ml-2 lao-text'>
                        ພ້ອມສົ່ງ
                      </span>
                    </div>


              <button className='lao-text px-3 py-2 bg-yellow-600 text-white mb-10 hover:bg-yellow-700'>
                   ເພີ່ມສິນຄ້າ
              </button>
            </form>


            {/* display image full screen */}
            {
                openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
                )
            }

           


      </div>
    </div>
  )
}

export default UploadProduct