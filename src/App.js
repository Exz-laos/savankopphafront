import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import SummaryApi from './common';
import Context from './context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Use useLocation to get the current path
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include', // for sending token to backend
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details
    fetchUserAddToCart(); // Fetch cart product count
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // User detail fetch
          cartProductCount, // Current user add to cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        {/* Show Footer only on the homepage */}
        {location.pathname === '/' && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;


