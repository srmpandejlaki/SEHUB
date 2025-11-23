import React from "react";
import IconCountProduct from "../../assets/icon/Vector-1.svg?react";
import IconCountCustomer from "../../assets/icon/Vector-2.svg?react";

function ShortPanel() {
  return(
    <div className="short-panel">
      <div className="panel">
        <div className="text">
          <p className="title">Jumlah Produk</p>
          <p className="number">3</p>
        </div>
        <div className="iconCircle">
          <div></div>
          <IconCountProduct className="icon onPanel" />
        </div>
      </div>
      <div className="panel">
        <div className="text">
          <p className="title">Total Pembeli</p>
          <p className="number">3</p>
        </div>
        <div className="iconCircle">
          <div></div>
          <IconCountCustomer className="icon onPanel" />
        </div>
      </div>
      <div className="panel">
        <div className="text">
          <p className="title">Stok Produk Sekarang</p>
          <p>SEHO SIROP 330ml : 13</p>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default ShortPanel;