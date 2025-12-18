import React from "react"; 
import IconEdit from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import TableInventoryItem from "../../../view/templates/table-inventory-item";

function TableInventory({ existingData }) {
  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
              <tr>
                  <th className="center">No</th>
                  <th>Hari/Tanggal</th>
                  <th>Produk</th>
                  <th className="center">Jumlah</th>
                  <th className="center">Tanggal Kadaluwarsa</th>
                  <th>Keterangan</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
            {existingData.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">Belum ada data.</td>
              </tr>
            ) : (
              existingData.map((item, index) => (
                <TableInventoryItem
                  key={item.id_barang_masuk || index}
                  rowNumber={index + 1}
                  tanggalMasuk={item.tanggal_masuk}
                  items={item.items}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-display">
        <div className="pages-count">
          <p>Halaman 1 dari {Math.ceil(existingData.length / 10) || 1}</p>
        </div>
        <div className="pagination">
          <div className="left">
            <IconPanahKiri blackIcon/>
            <p>Sebelumnya</p>
          </div>
          <div className="right">
            <p>Setelahnya</p>
            <IconPanahKanan blackIcon/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableInventory;