import React, { useState } from "react";
import ProductItem from "../../view/templates/product";
import Sirop1Img from "../../assets/public/gambar-produk/seho-sirop1.png";
// import DefaultImg from "../../assets/public/gambar-produk/default-img.png";
// import Granule1Img from "../../assets/public/gambar-produk/seho-granule1.png";

function ProductItems() {
  const [product, setproduct] = useState([]);
  
  const handleAddProduct = (newProduct) => {
    setproduct([...product, newProduct]);
  };
  return (
    <div className="product-items">
      <button
        onClick={() => handleAddProduct({
            name:"seho sirop",
            size:"330",
            unit:"ml",
            img:Sirop1Img,
          })
        }
      >Tambah</button>
      {product.map((item, index) => (
        <ProductItem 
          key={index}
          name={item.name}
          size={item.size}
          unit={item.unit}
          img={item.img}/>
      ))}
    </div>
  );
}

export default ProductItems;