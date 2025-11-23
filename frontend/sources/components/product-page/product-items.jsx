import React from "react";
import EditBtn from "../button/edit-btn";
import DeleteBtn from "../button/delete-btn";
import Sirop1Img from "../../assets/public/gambar-produk/seho-sirop1.png";
import DefaultImg from "../../assets/public/gambar-produk/default-img.png";
import Granule1Img from "../../assets/public/gambar-produk/seho-granule1.png";

function ProductItems() {
  return (
    <div className="product-items">
      <div className="product">
        <img src={Sirop1Img} alt="" />
        <div className="product-desc">
          <p>Seho Sirop<br/><br/>330ml</p>
        </div>
      </div>
      <div className="product">
        <img src={Sirop1Img} alt="" />
        <div className="product-desc">
          <p>Seho Sirop<br/><br/>330ml</p>
        </div>
      </div>
      <div className="product">
        <img src={Granule1Img} alt="" />
        <div className="product-desc">
          <p>Seho Granule<br/><br/>150g</p>
        </div>
      </div>
      <div className="product">
        <img src={Granule1Img} alt="" />
        <div className="product-desc">
          <p>Seho Granule<br/><br/>150g</p>
        </div>
      </div>
      <div className="product">
        <img src={DefaultImg} alt="" />
        <div className="product-desc">
          <p>Seho Block<br/><br/>500g</p>
        </div>
      </div>
      <div className="product">
        <img src={DefaultImg} alt="" />
        <div className="product-desc">
          <p>Seho Block<br/><br/>500g</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;