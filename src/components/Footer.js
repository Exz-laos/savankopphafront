import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa'; // Importing Facebook and WhatsApp icons
import Logo from '../assest/logo.png'; // Ensure the path and format are correct
import { AiFillTikTok } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className='bg-yellow-100'>
      <div className='container mx-auto p-4'>
        {/* Flex container for horizontal alignment on desktop and vertical on mobile */}
        <div className='flex flex-col md:flex-row md:items-start md:justify-between'>

          {/* Store Name and Logo */}
          <div className='flex flex-col items-center md:items-start mb-4 md:mb-0'>
            <h1 className='lao-text text-3xl font-bold text-center px-7 md:text-left mb-2' title='Store Name'>
              ຂອບພະສະຫວັນ
            </h1>
            {/* Ensure image fits well and maintains aspect ratio */}
            <img src={Logo} alt="logo" className="w-32 h-auto md:w-40 md:h-auto" />
          </div>

          {/* Overview Text */}
          <div className='py-10 mb-4 md:mb-0 md:w-1/3'>
            <p className='lao-text text-center md:text-left text-lg' title='Overview'>
              <span className='text-lg font-semibold'>ກ່ຽວກັບເຮົາ</span>
              <p>📢 ສະບາຍດີ ຮ້ານເຮົາຍິນດີບໍລິການ ຄົບຈົບທີ່ດຽວ</p>
              <p>✅ຂາຍຂອບພຣະ. ຂອບທອງສູດ.ຂອບຄຳອີຕາລີ.ຂອບເງີນ</p>
              <p>✅ລ້ຽມພາສຕິກກນ້ຳ 100% ດ້ວຍລະບົບເລເຊີ້</p>
              <p>✅ມີສາຍຄໍ.ກ່ອງໃສ່ພະ.ກ້ອງສ່ອງພະ ໃຫໍເລືອກ</p>
            </p>
          </div>

          {/* Contact Information */}
          <div className='lao-text py-10 mb-4 md:mb-0 md:w-1/3'>
            <div className='text-center md:text-left' title='Contact Information'>
              <p className='text-lg font-semibold'>ຕິດຕໍ່ເຮົາ</p>
      
         
              <div className='flex justify-center md:justify-start mt-2'>
                <a href='https://www.facebook.com/savannkoppha' target='_blank' rel='noopener noreferrer' className='text-blue-400 mr-4'>
                  <FaFacebook size={50} />
                </a>
                <a href='https://wa.me/+8562055698289' target='_blank' rel='noopener noreferrer' className='text-green-400'>
                  <FaWhatsapp size={50} />
                </a>
                <a href='https://www.tiktok.com/@amuletlaos?_t=8pSgxJxRYoi&_r=1' target='_blank' rel='noopener noreferrer' >
                <AiFillTikTok size={50}  />
                
                </a>
              </div>
            </div>
          </div>

          {/* Store Location Map */}
          <div className='py-10 mb-4 md:mb-0 md:w-1/3'>
            <p className='lao-text text-center text-lg font-semibold'>ແຜ່ນທີ່ຮ້ານ</p>
            <iframe className='py-4'
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955.8653983275675!2d104.7798373695185!3d16.603587184197114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313dcf255a1211e1%3A0xbc591fca5efa6424!2z4LqC4Lqt4Lqa4Lqe4Lqw4Lqq4Lqw4Lqr4Lqn4Lqx4LqZ!5e0!3m2!1sja!2sjp!4v1725181332454!5m2!1sja!2sjp"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
