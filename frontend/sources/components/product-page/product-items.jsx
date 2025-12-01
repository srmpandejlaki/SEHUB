import React, { useState, useEffect } from "react";
import ProductItem from "../../view/templates/product";
import Sirop1Img from "../../assets/public/gambar-produk/seho-sirop1.png";
// import DefaultImg from "../../assets/public/gambar-produk/default-img.png";
// import Granule1Img from "../../assets/public/gambar-produk/seho-granule1.png";

function ProductItems() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ambil = JSON.parse(localStorage.getItem("product")) || [];
    setData(ambil);
  }, []);
  
  return (
    <div className="product-items">
      <div className="product">
      <img src={Sirop1Img} alt="" />
      <div className="product-desc">
        <p>Seho Sirop<br/><br/>330ml</p>
      </div>
    </div>
      {data.map((item, index) => (
        <ProductItem 
          key={index}
          namaProduk={item.namaProduk}
          ukuranProduk={item.ukuranProduk}
          ukuranSatuan={item.ukuranSatuan}
          gambarProduk={item.gambar}/>
      ))}
    </div>
  );
}

export default ProductItems;