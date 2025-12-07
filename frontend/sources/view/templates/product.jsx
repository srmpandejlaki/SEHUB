import React from "react";

function ProductItem({ namaProduk, ukuranProduk, ukuranSatuan, gambarProduk }) {

  return(
    <div className="product">
      <img src={`http://localhost:5000/products/uploads/${gambarProduk}`} alt={namaProduk} />
      <div className="product-desc">
        <p>{namaProduk}<br/><br/>{ukuranProduk}{ukuranSatuan}</p>
      </div>
    </div>
  );
}

export default ProductItem;