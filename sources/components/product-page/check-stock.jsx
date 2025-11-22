import React from "react";
import IconChecking from "../../assets/icon/uim_process.svg?react";

function CheckStock({ openCekStok }) {
  return(
    <div className="check-stock">
      <div className="header">
        <IconChecking className="icon blackIcon" />
        <p>Cek Stok Gudang</p>
      </div>
      <div className="main">
        <div className="lists-stock">
          <div className="product-title">
            <p>LS01330  Seho Sirop 330ml</p>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tanggal Masuk</th>
                <th>Tanggal Kadaluwarsa</th>
                <th>Data Inventori</th>
                <th>Stok Gudang</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
            </tbody>
          </table>
          <div className="total">
            <p>Total Produk <span>24 botol</span></p>
          </div>
        </div>
        <div className="lists-stock">
          <div className="product-title">
            <p>LS01330  Seho Sirop 330ml</p>
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tanggal Masuk</th>
                <th>Tanggal Kadaluwarsa</th>
                <th>Data Inventori</th>
                <th>Stok Gudang</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
              <tr>
                <td>1.</td>
                <td>23 November 2025</td>
                <td>27 Februari 2026</td>
                <td>8 botol</td>
                <td><input type="checkbox" name="Stok Gudang" id="" /></td>
              </tr>
            </tbody>
          </table>
          <div className="total">
            <p>Total Produk <span>24 botol</span></p>
          </div>
        </div>
      </div>
      <div className="button" onClick={openCekStok} >
        <button className="base-btn black">Selesai</button>
      </div>
    </div>
  );
}

export default CheckStock;