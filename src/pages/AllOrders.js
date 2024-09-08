import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import Swal from 'sweetalert2';

import { FaWhatsapp } from 'react-icons/fa';

import { FaEye, FaSyncAlt, FaCheck, FaTruck, FaBan,  } from 'react-icons/fa';
import { TfiFullscreen } from "react-icons/tfi";
const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // For storing the selected order details
    const [openOrderDetail, setOpenOrderDetail] = useState(false);
   


    const fetchAllOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include',
            });
            const data = await response.json();
    
            console.log(data);  // Check if cartItems are populated correctly
    
            if (data.success) {
                setAllOrders(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch orders. Please try again.");
        }
    };
    



    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(SummaryApi.updateOrderStatus.url(orderId, newStatus), {
                method: SummaryApi.updateOrderStatus.method,
                credentials: 'include',
            });
            const data = await response.json();

            if (data.success) {
                setAllOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                toast.error(data.message || "Failed to update order status.");
            }
        } catch (error) {
            toast.error("Failed to update order status. Please try again.");
        }
    };

    const handlePay = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Payment',
                text: 'You received payment and verified your information',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'pay');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleSend = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Shipping',
                text: 'You want to mark this order as shipped',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'send');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleCancel = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Cancel',
                text: 'You want to cancel this order',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'cancel');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const handleReset = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Reset',
                text: 'You want to reset this order status to "wait"',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (result.isConfirmed) {
                await updateOrderStatus(orderId, 'wait');
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            });
        }
    };

    const displayStatusText = (status) => {
        if (status === 'wait') {
            return <div className="lao-text bg-yellow-200 rounded-full">pending..!</div>;
        }
        if (status === 'pay') {
            return <div className="lao-text bg-green-500 rounded-full">comfirmed</div>;
        }
        if (status === 'send') {
            return <div className="lao-text bg-blue-200 rounded-full">shipped</div>;
        }
        if (status === 'cancel') {
            return <div className="lao-text bg-red-500 rounded-full w-fit">cancelled</div>;
        }
        return <div className="badge bg-secondary">Unknown</div>;
    };

    const handleSeeOrderDetail = (order) => {

        console.log(order); 
        setSelectedOrder(order);
        setOpenOrderDetail(true);
    };


    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
 <div className='bg-white py-4 h-[calc(100vh-18px)] overflow-y-auto'>
       

    <div className="overflow-x-auto relative">

      <table className="w-full userTable table-auto">
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="p-2 text-center">Name and Surname</th>
            <th className="p-2 text-center">Whatsapp</th>
            <th className="p-2 text-center"> Date</th>
            <th className="p-2 text-center"> Time</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Detail</th>
            <th className="p-2 text-center">
             <div className='item-center'>
               <span className='p-32'> Actions     </span>
            <button
          className=" p-2 rounded cursor-pointer hover:bg-gray-300"
          onClick={() => document.querySelector('.userTable').classList.toggle('fullscreen')}
        >
            <TfiFullscreen/>
        </button>
                </div>
            </th>
          </tr>
        </thead>
        <tbody className='lao-text'>
          {allOrders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="p-2 text-center">{order.customerName + " " + order.customerSurname}</td>
              <td className="p-2 text-center"> <a href={`https://wa.me/+85620${order.customerWhatsapp}`} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: '#25D366', marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            <FaWhatsapp size={20} style={{ marginRight: '4px' }} />
            {order.customerWhatsapp}
        </a></td>
              <td className="p-2 text-center">{moment(order.payDate).format('L')}</td>
              <td className="p-2 text-center">{order.payTime}</td>
              <td className="p-2 text-center">{displayStatusText(order.status)}</td>
              <td className="p-2 text-center">
                <FaEye size={36} className="cursor-pointer " onClick={() => handleSeeOrderDetail(order)} />
              </td>
              <td className="lao-text p-2 text-center">
                <button
                  className='bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-yellow-500 inline-flex items-center justify-center'
                  onClick={() => handleReset(order._id)}
                  disabled={order.status === 'wait'}>
                  <FaSyncAlt /> 
                  <span className="ml-2">Reset </span>
                </button>
                <button
                  className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 inline-flex items-center justify-center'
                  onClick={() => handlePay(order._id)}
                  disabled={order.status !== 'wait'}>
                  <FaCheck  />
                  <span className="ml-2">ຢືນຢັນ</span>
                </button>
                <button
                  className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 inline-flex items-center justify-center'
                  onClick={() => handleSend(order._id)}
                  disabled={order.status !== 'pay'}>
                  <FaTruck />
                  <span className="ml-2"> ສົ່ງ</span>
                </button>
                <button
                  className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 inline-flex items-center justify-center'
                  onClick={() => handleCancel(order._id)}
                  disabled={order.status === 'cancel'}>
                  <FaBan />
                  <span className="ml-2">ຍົກເລີກ</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  

        

 {/* Order Detail Modal */}
 {openOrderDetail && selectedOrder && (
    <div className="lao-text order-details-modal">
        <div className="modal-content">
            <span className="close-button" onClick={() => setOpenOrderDetail(false)}>&times;</span>
            <h2 className="modal-title">Order Details for {selectedOrder.customerName} {selectedOrder.customerSurname}</h2>
            <div className="modal-body">
    <p><strong>Customer:</strong> {selectedOrder.customerName + " " + selectedOrder.customerSurname}</p>
    <p><strong>Slip:</strong> <img src={selectedOrder.bankslipImage} className='w-52 h-96' alt="Bank Slip"/></p>
    <p><strong>Order details:</strong> <img src={selectedOrder.orderImage} className='w-auto h-auto' alt="Order Details"/></p>
    <p><strong>What:</strong> {selectedOrder.shippingChoice}</p>
    <p><strong>Where:</strong> {selectedOrder.shippingChoiceName}</p>
    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
    <p style={{ display: 'flex', alignItems: 'center' }}>
        <strong>Whatsapp:</strong>
        <a href={`https://wa.me/+85620${selectedOrder.customerWhatsapp}`} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: '#25D366', marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            <FaWhatsapp size={20} style={{ marginRight: '4px' }} />
            {selectedOrder.customerWhatsapp}
        </a>
    </p>
    <p><strong>Note:</strong> {selectedOrder.note}</p>
</div>

            <button className="lao-text close-modal-button" onClick={() => setOpenOrderDetail(false)}>ປິດ</button>
        </div>
    </div>
)}
        </div>
    );
};

export default AllOrders;