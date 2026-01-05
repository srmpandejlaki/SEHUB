import React from "react";

function DistributionCard({ namaProduk, ukuranProduk, ukuranSatuan, totalDistribusi, distribusiHariIni, imageProduk }) {
  return (
    <div className="items">
      <img src={imageProduk} alt={namaProduk} />
      <div className="item-desc">
        <p className="product-name">{namaProduk}<br/><span>{ukuranProduk}{ukuranSatuan}</span></p>
        <div className="counting">
          <div className="minimum-stock">
            <p className="title">Total</p>
            <p className="number">{totalDistribusi || 0}</p>
          </div>
          <div className="stock-now">
            <p className="title">Hari ini</p>
            <p className="number">{distribusiHariIni || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributionCard;