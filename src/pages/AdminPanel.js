// import React, { useEffect } from 'react';
// import { FaRegUserCircle } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import ROLE from '../common/role';

// const AdminPanel = () => {
//   const user = useSelector(state => state?.user?.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.role !== ROLE.ADMIN) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   return (
//     <div className='min-h-screen flex'>
//       <aside className='bg-yellow-700 min-h-full w-60 customShadow'>
//         <div className='h-32 flex justify-center items-center flex-col'>
//           <Link to={'/'} className='text-5xl cursor-pointer relative flex justify-center'>
//             {
//               user?.profilePic ? (
//                 <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
//               ) : (
//                 <FaRegUserCircle />
//               )
//             }
//           </Link >
//           <p className='capitalize text-lg font-semibold'>{user?.name}</p>
//           <p className='text-sm'>{user?.role}</p>
//         </div>
//         <nav className='grid p-4'>
//           <Link to="all-users" className='px-2 py-1 hover:bg-yellow-100 font-extrabold'>All Users</Link>
//           <Link to="all-products" className='px-2 py-1 hover:bg-yellow-100 font-extrabold'>All Products</Link>
//           <Link to="all-orders" className='px-2 py-1 hover:bg-yellow-100 font-extrabold'>All orders</Link>
//         </nav>
//       </aside>
//       <main className='w-full h-full p-2 flex-1'>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;


import React from 'react';
import { FaRegUserCircle, FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);

  return (
    <div className='min-h-screen flex'>
      <aside className='bg-yellow-700 min-h-full w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col'>
          <Link to={'/'} className='text-5xl cursor-pointer relative flex justify-center'>
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
              ) : (
                <FaRegUserCircle />
              )
            }
          </Link >
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>
        <nav className='grid p-4'>
          <Link to="all-users" className='px-2 py-1 hover:bg-yellow-100 font-extrabold flex items-center'>
            <FaUsers className='mr-2' />
            All Users
          </Link>
          <Link to="all-products" className='px-2 py-1 hover:bg-yellow-100 font-extrabold flex items-center'>
            <FaBox className='mr-2' />
            All Products
          </Link>
          <Link to="all-orders" className='px-2 py-1 hover:bg-yellow-100 font-extrabold flex items-center'>
            <FaShoppingCart className='mr-2' />
            All Orders
          </Link>
        </nav>
      </aside>
      <main className='w-full h-full p-2 flex-1'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

