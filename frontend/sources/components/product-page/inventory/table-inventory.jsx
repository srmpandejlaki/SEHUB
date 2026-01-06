import React from "react"; 
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import TableInventoryItem from "../../../view/templates/table-inventory-item";

function TableInventory({ 
  existingData, 
  onEdit,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
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
                  rowNumber={(currentPage - 1) * 10 + index + 1}
                  tanggalMasuk={item.tanggal_masuk}
                  items={item.items}
                  id_barang_masuk={item.id_barang_masuk}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-display">
        <div className="pages-count">
          <p>Halaman {currentPage} dari {totalPages}</p>
        </div>
        <div className="pagination">
          <div 
            className="left"
            style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
            onClick={() => currentPage > 1 && onPageChange && onPageChange(currentPage - 1)}
          >
            <IconPanahKiri className="blackIcon"/>
            <p>Sebelumnya</p>
          </div>
          <div 
            className="right"
            style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
            onClick={() => currentPage < totalPages && onPageChange && onPageChange(currentPage + 1)}
          >
            <p>Setelahnya</p>
            <IconPanahKanan className="blackIcon"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableInventory;