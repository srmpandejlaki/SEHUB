import React from "react";
import { BASE_URL } from "../../utilities";

function ProductItem({ namaProduk, ukuranProduk, ukuranSatuan, imageProduk }) {

  return(
    <div className="product">
      <img src={`${BASE_URL}products/uploads/${imageProduk}`} alt={namaProduk} />
      <div className="product-desc">
        <p>{namaProduk}<br/><br/>{ukuranProduk}{ukuranSatuan}</p>
      </div>
    </div>
  );
}

export default ProductItem;