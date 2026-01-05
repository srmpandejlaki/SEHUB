import React from "react";
import DistributionCard from "../../../view/templates/distribution-card";

function DistributionProduct({ existingData }) {
  return(
    <div className="inventory-items">
      {existingData.length === 0 ? (
        <p className="no-data">Belum ada produk.</p>
      ) : (
        existingData.map((item) => (
          <DistributionCard 
            key={item.id}
            namaProduk={item.namaProduk}
            ukuranProduk={item.ukuranProduk}
            ukuranSatuan={item.ukuranSatuan}
            totalDistribusi={item.totalDistribusi}
            distribusiHariIni={item.distribusiHariIni}
            imageProduk={item.imageProduk} />
        ))
      )}
    </div>
  );
}

export default DistributionProduct;