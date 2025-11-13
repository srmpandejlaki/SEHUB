import React from "react";
import EditBtn from "../button/edit-btn";
import DeleteBtn from "../button/delete-btn";

function ProductItems() {
  return (
    <div className="product-items">
      <div className="product">
        <p>Produk 1</p>
        <img src="" alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
      <div className="product">
        <p>Produk 2</p>
        <img src="" alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
      <div className="product">
        <p>Produk 3</p>
        <img src="" alt="" />
        <div className="button-side">
          <EditBtn /> 
          <DeleteBtn />
        </div>
      </div>
    </div>
  );
}

export default ProductItems;