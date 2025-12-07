import React from "react";
import ProductItem from "../../view/templates/product";

function ProductItems({ products }) {
  return (
    <div className="product-items">
      {products.length === 0 ? (
        <p className="no-data">Belum ada produk.</p>
      ) : (
        products.map((item) => (
          <ProductItem
            key={item.id}
            namaProduk={item.namaProduk}
            ukuranProduk={item.ukuranProduk}
            ukuranSatuan={item.ukuranSatuan}
            kemasanProduk={item.kemasanProduk}
            gambarProduk={item.imageProduk}
          />
        ))
      )}
    </div>
  );
}

export default ProductItems;
