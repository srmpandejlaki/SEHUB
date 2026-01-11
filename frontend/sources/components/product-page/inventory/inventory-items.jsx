import React from "react";
import InventoryCard from "../../../view/templates/inventory-card";

function InventoryProduct({ existingData, onEdit }) {
  return(
    <div className="inventory-items">
      {existingData.length === 0 ? (
        <p className="no-data">Belum ada produk.</p>
      ) : (
        existingData.map((item) => (
          <InventoryCard 
            key={item.id}
            namaProduk={item.namaProduk}
            ukuranProduk={item.ukuranProduk}
            ukuranSatuan={item.ukuranSatuan}
            minimumStock={item.minimumStock}
            stokSekarang={item.stokSekarang}
            imageProduk={item.imageProduk} 
            onEdit={onEdit ? () => onEdit(item) : null}
          />
        ))
      )}
    </div>
  );
}

export default InventoryProduct;