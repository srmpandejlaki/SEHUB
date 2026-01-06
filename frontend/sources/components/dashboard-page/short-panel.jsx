import React from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";
// import IconStock from "../../assets/icon/mingcute_inventory-line.svg?react";

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
      <div className="panel stock-list-panel">
        <div className="stock-header">
          <div className="stock-title-group">
            {/* <IconStock className="icon stock-icon" /> */}
            <p className="title">Stok Produk Sekarang</p>
          </div>
        </div>
        <div className="stock-content">
          {productsWithStock.length === 0 ? (
            <p className="stock-empty">Belum ada produk</p>
          ) : (
            <div className="stock-items-list">
              {productsWithStock.slice(0, 5).map((product) => (
                <div key={product.id_produk} className="stock-row">
                  <span className="stock-product-name">
                    {product.nama_produk} {product.ukuran_produk}{product.nama_ukuran_satuan}
                  </span>
                  <span className={`stock-count ${product.stok_sekarang < product.stok_minimum ? "low-stock" : ""}`}>
                    {product.stok_sekarang}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortPanel;
