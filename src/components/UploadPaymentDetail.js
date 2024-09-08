import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import displayKIPCurrency from '../helpers/displayCurrency';
import { FaWhatsapp } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import QRCODE from '../assest/QR.jpeg'
const UploadPaymentDetail = ({
    onClose,
    fetchData,
    cartItems  // Receive the selected product as a prop
}) => {
    const SHIPPING_COST = 12000; // Default shipping cost
    const [data, setData] = useState({
        cartItems: [],
        orderImage:[],
        customerName: "",
        customerSurname: "",
        customerPhone: "",
        customerWhatsapp: "",
        shippingChoice: "",
        shippingChoiceName: "",
        bankName: "",
        bankslipImage: [],
        payDate: "",
        payTime: "",
        note: "",
    
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
 

    useEffect(() => {
        // Get current date and time
        const now = new Date();
    
        // Format date as YYYY-MM-DD
        const currentDate = now.toISOString().split('T')[0];
    
        // Format time as HH:MM
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
    
        // Set the default values
        setData(prevData => ({
            ...prevData,
            payDate: currentDate,
            payTime: currentTime,
            cartItems: cartItems  // Initialize cartItems in state
        }));
    }, [cartItems]);
    

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUploadOrderImage = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData(prevData => ({
            ...prevData,
            orderImage: [...prevData.orderImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteOrderImage = (index) => {
        const newOrderImage = [...data.orderImage];
        newOrderImage.splice(index, 1);

        setData(prevData => ({
            ...prevData,
            orderImage: newOrderImage
        }));
    };

    const handleUploadBankSlip = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            bankslipImage: [...prev.bankslipImage, uploadImageCloudinary.url]
        }));
    };


    const handleDeleteBankSlipImage = (index) => {
        const newBankslipImage = [...data.bankslipImage];
        newBankslipImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            bankslipImage: newBankslipImage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(SummaryApi.uploadPaymentForm.url, {
                method: SummaryApi.uploadPaymentForm.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, cartItems }) // Include cartItems here
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.success) {
                // Convert the React icon component to an HTML string
                const whatsappLinkHtml = ReactDOMServer.renderToStaticMarkup(
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <a href='https://wa.me/+8562055698289' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: '#25D366', textAlign: 'center' }}>
                            <FaWhatsapp size={60} /> {/* Larger and green WhatsApp icon */}
                            <p style={{ marginTop: '10px', textAlign: 'center' }}>ກົດບ່ອນນີ້ເພື່ອຮັບບິນສົ່ງເຄື່ອງ</p>
                        </a>
                    </div>
                );
    
                Swal.fire({
                    title: 'ສຳເລັດ!',
                    text: responseData.message,
                    icon: 'success',
                    showConfirmButton: false, // Hide the OK button
                    footer: whatsappLinkHtml,  // Use the HTML string here
                    willClose: () => {
                        onClose();
                        fetchData();
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: responseData.message || 'Failed to upload the payment form.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error('Upload payment form error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while uploading the payment form.',
                icon: 'error',
                showConfirmButton: true
            });
        }
    };
    

    

       // Calculate total product cost
    const totalProductCost = cartItems.reduce((total, item) => {
        return total + item?.productId?.sellingPrice * item.quantity;
    }, 0);

    // Calculate total cost including shipping
    const totalCostIncludingShipping = totalProductCost + SHIPPING_COST;

    



    

    return (
        <div className='lao-text fixed w-full h-full bg-gray-500 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>ຟອມຊຳລະເງິນ</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>


              


    

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>




                       {/* Display Selected Products */}
                <div className='border-4 border-lime-600 p-4 bg-lime-100' >
                    <label htmlFor="cartItems">ລາຍການທີ່ທ່ານສັ່ງຊື້:</label>
                    <div>
                    <div className="text-center text-red-500">ໝາຍເຫດ: ກະລຸນາແຄັບຫນ້າຈໍລາຍການໃນບ໋ອກສີຂຽວນີ້ໄວ້!!!</div>
                      
                 
                      {cartItems.length > 0 ? (
                          cartItems.map((item, index) => (
                              <div key={index} className='flex justify-between items-center border-b py-2'>
                                  <div className='flex items-center gap-2'>
                                      <img src={item?.productId?.productImage[0]} alt={item?.productId?.productName} className='w-16 h-16 object-cover' />
                                      <div>
                                          <p>{item?.productId?.productName}</p>
                                          <p className='text-xs text-slate-500'>{item?.productId?.category}</p>
                                      </div>
                                  </div>
                                  <div>
                                      <p>ຈຳນວນ: {item.quantity}</p>
                                      <p>ລາຄາລວມ: {displayKIPCurrency(item?.productId?.sellingPrice * item.quantity)}</p>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <p>No products selected.</p>
                      )}
                  </div>

                  {/* Display Summary Price */}
                  <div className='mt-4'>
                      <div className='flex justify-between'>
                          <p className='font-bold'>ລາຄາລວມສິນຄ້າ:</p>
                          <p>{displayKIPCurrency(totalProductCost)}</p>
                      </div>
                      <div className='flex justify-between'>
                          <p className='font-bold'>ຄ່າຂົນສົ່ງ:</p>
                          <p>{displayKIPCurrency(SHIPPING_COST)}</p>
                      </div>
                      
                      <div className='flex justify-between mt-2'>
                          <p className='font-bold text-lg bg-yellow-200'>ລາຄາລວມທັງໝົດ:</p>
                          <p className='font-bold text-lg bg-yellow-200'>{displayKIPCurrency(totalCostIncludingShipping)}</p>
                      </div>
                  </div>
                    </div>
                 


                         {/* Order Image */}
                         <label htmlFor='orderImage' className='mt-3'>ຮູບພາບລາຍການໃນບ໋ອກສີຂຽວຂ້າງເທິງນິ້:</label>
                    
                    <label htmlFor='orderImage'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>ເລືອກຮູບພາບທີ່ຈະອັບໂຫລດ</p>
                            </div>
                        </div>
                    </label>
                    <input
                        type='file'
                        id='orderImage'
                        accept="image/*"
                        className='hidden'
                        required
                        onChange={handleUploadOrderImage}
                    />     {/* Display Images */}
                     {
                        data?.orderImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                  data.orderImage.map((image, index) =>{
                                    return(
                                        <div className='relative' key={index}>
                                        <img src={image} alt={`orderImage-${index}`}
                                           width={120} 
                                           height={120}  
                                           className='bg-slate-100 border cursor-pointer'  
                                            onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(image);
                                        }} />
                                        <button type="button" onClick={() => handleDeleteOrderImage(index)} className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1">
                                            <MdDelete />
                                        </button>
                                    </div>
                                    )
                                  })
                                }
                            </div>
                        ) : (
                          <p className='text-red-600 text-xs'>*ກະລຸນາເພີ່ມຮູບພາບສິນຄ້າທີ່ທ່ານສັ່ງຈາກບ໋ອກສີຂຽວ</p>
                        )
                      }

                      






                    {/* Customer Name */}
                    <label htmlFor='customerName'>ຊື່ລູກຄ້າ:</label>
              
                    <input
                        type='text'
                        id='customerName'
                        placeholder='ກະລຸນາກອກຊື່ລູກຄ້າ'
                        name='customerName'
                        value={data.customerName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Customer Surname */}
                    <label htmlFor='customerSurname' className='mt-3'>ນາມສະກຸນລູກຄ້າ:
                
                    </label>
             
                    <input
                        type='text'
                        id='customerSurname'
                        placeholder='ກະລຸນາກອກນາມສະກຸນລູກຄ້າ'
                        name='customerSurname'
                        value={data.customerSurname}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Customer Phone */}
                    <label htmlFor='customerPhone' className='mt-3'>ເບີໂທລະສັບລູກຄ້າ:</label>
                    <input 
                        type='tel' 
                        id='customerPhone' 
                        name='customerPhone' 
                        value={data.customerPhone} 
                        onChange={handleOnChange} 
                        placeholder='ກະລຸນາກອກເບີໂທລະສັບລູກຄ້າ'
                        className='p-2 bg-slate-100 border rounded' 
                        required 
                    />

                    {/* Customer Whatsapp */}
                    <label htmlFor='customerWhatsapp' className='mt-3'>WhatsApp:</label>
          
                    <input 
                        type='tel' 
                        id='customerWhatsapp' 
                        name='customerWhatsapp' 
                        value={data.customerWhatsapp} 
                        onChange={handleOnChange} 
                        placeholder='ກະລຸນາກອກເບີ WhatsApp ຕົວຢ່າງ:12345678 , +85620 ບໍ່ຈຳເປັນ' 
                        className='p-2 bg-slate-100 border rounded' 
                        required 
                    />

                      {/* Shipping Choice */}
            <label htmlFor='shippingChoice' className='mt-3'>
                ຊື່ບໍລິສັດຂົນສົ່ງ:
            </label>
       
            <select
                id='shippingChoice'
                name='shippingChoice'
                value={data.shippingChoice}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
            ><option value={""}>ເລືອກບໍລິສັດຂົນສົ່ງ</option>
                <option value='ອານຸສິດຂົນສົ່ງ'>ອານຸສິດຂົນສົ່ງ</option>
                <option value='ມີໄຊຂົນສົ່ງ'>ມີໄຊຂົນສົ່ງ</option>
                <option value='ຮຸ່ງອາລຸນຂົນສົ່ງ'>ຮຸ່ງອາລຸນຂົນສົ່ງ</option>
          
               
            </select>
                    {/* Shipping Choice Name */}
                    <label htmlFor='shippingChoiceName' className='mt-3'>ຊື່ສາຂາ, ບ້ານ, ເມືອງ, ແຂວງ:</label>
                 
                    <input
                        type='text'
                        id='shippingChoiceName'
                        placeholder='ຕົວຢ່າງ: ສາຂາ ອຸດົມວິໄລ , ອຸດົມວິໄລ , ໄກສອນ, ສະຫວັນ'
                        name='shippingChoiceName'
                        value={data.shippingChoiceName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="text-center mb-4">
                        <div className="text-lg font-semibold mb-2">ກະລຸນາໂອນເງິນມາບັນຊີຜ່ານທະນາຄານນິ້</div>
                        <div className="text-base mb-2">ຊື່ບັນຊີ</div>
                        <div className="text-base font-medium mb-2">THANONGPHONE ANOTHAY MR</div>
                        <div className="text-base mb-2">ເລກບັນຊີ</div>
                        <div className="text-base font-medium mb-4">030120001645324001</div>
                        <div className="text-base mb-2">ຫຼື ຜ່ານ QR CODE</div>
                        <div className="flex justify-center items-center">
                            <img src={QRCODE} alt="QR Code" className="w-48 h-56 object-cover" />
                        </div>
                    </div>
                </div>



                    {/* Bank Slip Image */}
                    <label htmlFor='bankslipImage' className='mt-3'>ຮູບພາບໃບບິນ:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>ເລືອກຮູບພາບທີ່ຈະອັບໂຫລດ</p>
                            </div>
                        </div>
                    </label>
                    <input
                        type='file'
                        id='uploadImageInput'
                        accept="image/*"
                        className='hidden'
                        required
                        onChange={handleUploadBankSlip}
                    />     {/* Display Images */}
                     {
                        data?.bankslipImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                  data.bankslipImage.map((image, index) =>{
                                    return(
                                        <div className='relative' key={index}>
                                        <img src={image} alt={`bankslip-${index}`}
                                           width={120} 
                                           height={120}  
                                           className='bg-slate-100 border cursor-pointer'  
                                            onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(image);
                                        }} />
                                        <button type="button" onClick={() => handleDeleteBankSlipImage(index)} className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1">
                                            <MdDelete />
                                        </button>
                                    </div>
                                    )
                                  })
                                }
                            </div>
                        ) : (
                          <p className='text-red-600 text-xs'>*ກະລຸນາເພີ່ມຮູບພາບສະລິບການໂອນເງິນຂອງລູກຄ້າ</p>
                        )
                      }
                      {/* Pay Date */}
                    <label htmlFor='payDate' className='mt-3'>ວັນທີໂອນ:</label>
            
                    <input
                        type='date'
                        id='payDate'
                        name='payDate'
                        value={data.payDate}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    {/* Pay Time */}
                    <label htmlFor='payTime' className='mt-3'>ເວລາທີ່ໂອນ:</label>
                   
                    <input
                        type='time'
                        id='payTime'
                        name='payTime'
                        value={data.payTime}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    {/* Note */}
                  
                    <label htmlFor='note' className='mt-3'>ໝາຍເຫດ:</label>
                    <textarea
                        id='note'
                        name='note'
                        value={data.note}
                        onChange={handleOnChange}
                        className='h-28 bg-slate-100 border resize-none p-1 lao-text'
                        placeholder='ກະລຸນາກອກໝາຍເຫດ...'
                    
                    />
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded mt-4'>ອັບໂຫລດ</button>
                </form>
            </div>


             {/* display image full screen */}
            {
                openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
                )
            }
        </div>
    );
};

export default UploadPaymentDetail;
