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
        <p>Produk 1</p>
        <img src={Sirop1Img} alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
      <div className="product">
        <p>Produk 2</p>
        <img src={Granule1Img} alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
      <div className="product">
        <p>Produk 3</p>
        <img src={DefaultImg} alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
    </div>
  );
}

export default ProductItems;