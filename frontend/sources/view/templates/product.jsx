import React from "react";

function ProductItem({ name, size, unit, img }) {
  return(
    <div className="product">
      <img src={img} alt="" />
      <div className="product-desc">
        <p>{name}<br/><br/>{size}{unit}</p>
      </div>
    </div>
  );
}

export default ProductItem;