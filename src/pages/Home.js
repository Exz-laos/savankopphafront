import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='lao-text'>
       <CategoryList/>
       <BannerProduct/>

  
       <HorizontalCardProduct category={"ສິນຄ້າຂາຍດີ"} heading={"ສິນຄ້າຂາຍດີ"}/>
       <HorizontalCardProduct category={"ປ່ອຍບູຊາພຣະເຄື່ອງ"} heading={"ປ່ອຍບູຊາພຣະເຄື່ອງ"}/>

       <VerticalCardProduct category={"ຂອບພຣະທອງສູດ"} heading={"ຂອບພຣະທອງສູດ"}/>
       <VerticalCardProduct category={"ຂອບຄຳອິຕາລີ"} heading={"ຂອບຄຳອິຕາລີ"}/>
       <VerticalCardProduct category={"ຂອບເງິນ"} heading={"ຂອບເງິນ"}/>
       <VerticalCardProduct category={"ສາຍຄໍ"} heading={"ສາຍຄໍ"}/>
       <VerticalCardProduct category={"ກ້ອງສ່ອງພະ"} heading={"ກ້ອງສ່ອງພະ"}/>
       <VerticalCardProduct category={"ກ໋ອງໃສ່ພຣະ"} heading={"ກ໋ອງໃສ່ພຣະ"}/>
       <VerticalCardProduct category={"ປ່ອຍຂອງເກົ່າ"} heading={"ປ່ອຍຂອງເກົ່າ"}/>
       <VerticalCardProduct category={"ສິນຄ້າອື່ນໆ"} heading={"ສິນຄ້າອື່ນໆ"}/>
   
    </div>
  )
}

export default Home