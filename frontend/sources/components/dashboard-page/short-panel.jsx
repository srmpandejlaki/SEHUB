import React from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";

function ShortPanel({ statistics }) {
  const { totalProducts = 0,  productsWithStock = [] } = statistics || {};

  return(
    <div className="short-panel">
      <div className="panel">
        <div className="text">
          <p className="title">Jumlah Produk</p>
          <p className="number">{totalProducts}</p>
        </div>
        <div className="iconCircle">
          <div></div>
          <IconCountProduct className="icon onPanel" />
        </div>
      </div>
      <div className="panel stock-list">
        <div className="text">
          <p className="title">Stok Produk Sekarang</p>
          {productsWithStock.length === 0 ? (
            <p className="stock-item">Belum ada produk</p>
          ) : (
            productsWithStock.slice(0, 5).map((product) => (
              <p key={product.id_produk} className="stock-item">
                {product.nama_produk} {product.ukuran_produk}{product.nama_ukuran_satuan}: {" "}
                <span className={product.stok_sekarang < product.stok_minimum ? "low-stock" : ""}>
                  {product.stok_sekarang}
                </span>
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortPanel;