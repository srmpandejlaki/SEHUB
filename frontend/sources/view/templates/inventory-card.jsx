import React from "react";
import { BASE_URL } from "../../utilities";

function InventoryCard() {
  return(
    <div className="items">
      <img src="" alt="" />
      <div className="item-desc">
        <p className="product-name">Seho Sirop<br/><span>330ml</span></p>
        <div className="counting">
          <div className="minimum-stock">
            <p className="title">Minimum</p>
            <p className="number">50</p>
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