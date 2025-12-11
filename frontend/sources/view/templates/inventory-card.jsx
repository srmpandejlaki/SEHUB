import React from "react";

function InventoryCard({ namaProduk, ukuranProduk, ukuranSatuan, minimumStock, imageProduk }) {
  return(
    <div className="items">
      <img src={imageProduk} alt={namaProduk} />
      <div className="item-desc">
        <p className="product-name">{namaProduk}<br/><span>{ukuranProduk}{ukuranSatuan}</span></p>
        <div className="counting">
          <div className="minimum-stock">
            <p className="title">Minimum</p>
            <p className="number">{minimumStock}</p>
          </div>
          <div className="stock-now">
            <p className="title">Sekarang</p>
            <p className="number">50</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;