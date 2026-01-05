import React from "react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import IconDelete from "../../../assets/icon/material-symbols_delete.svg?react";

function TableStockAdjustment({ 
  data = [], 
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Flatten data for table display
  const tableRows = [];
  data.forEach((adj, adjIndex) => {
    if (adj.items && adj.items.length > 0) {
      adj.items.forEach((item, itemIndex) => {
        tableRows.push({
          ...adj,
          item,
          isFirstRow: itemIndex === 0,
          rowSpan: adj.items.length,
          rowNumber: (currentPage - 1) * 10 + adjIndex + 1
        });
      });
    } else {
      tableRows.push({
        ...adj,
        item: null,
        isFirstRow: true,
        rowSpan: 1,
        rowNumber: (currentPage - 1) * 10 + adjIndex + 1
      });
    }
  });

  return(
    <div className="table-stock-adjustment">
      <div className="table-display">
        <table>
          <thead>
            <tr>
              <th className="center">No</th>
              <th>Tanggal</th>
              <th>Produk</th>
              <th className="center">Stok Sistem</th>
              <th className="center">Stok Gudang</th>
              <th className="center">Selisih</th>
              <th>Kondisi</th>
              <th>Catatan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="9" className="center">Tidak ada data penyesuaian stok</td>
              </tr>
            ) : (
              tableRows.map((row, index) => {
                const selisih = row.item ? row.item.stok_gudang - row.item.stok_sistem : 0;
                const selisihText = selisih > 0 ? `+${selisih}` : selisih.toString();
                
                return (
                  <tr key={`${row.id_penyesuaian_stok}-${index}`}>
                    {row.isFirstRow && (
                      <>
                        <td className="center" rowSpan={row.rowSpan}>{row.rowNumber}</td>
                        <td rowSpan={row.rowSpan}>{formatDate(row.tanggal_penyesuaian)}</td>
                      </>
                    )}
                    <td>
                      {row.item ? (
                        <div className="produk-code">
                          <p className="code">{row.item.id_produk}</p>
                          <p className="name">
                            {row.item.nama_produk} {row.item.ukuran_produk}{row.item.nama_ukuran_satuan}
                          </p>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="center">{row.item?.stok_sistem || "-"}</td>
                    <td className="center">{row.item?.stok_gudang || "-"}</td>
                    <td className={`center ${selisih !== 0 ? 'highlight' : ''}`}>
                      {row.item ? selisihText : "-"}
                    </td>
                    <td>
                      <span className={`status-badge ${row.item?.nama_kondisi?.toLowerCase() || ''}`}>
                        {row.item?.nama_kondisi || "-"}
                      </span>
                    </td>
                    {row.isFirstRow && (
                      <>
                        <td rowSpan={row.rowSpan}>{row.catatan_penyesuaian || "-"}</td>
                        <td rowSpan={row.rowSpan}>
                          <IconDelete 
                            className="icon redIcon" 
                            style={{ cursor: 'pointer', width: '20px' }}
                            onClick={() => onDelete && onDelete(row.id_penyesuaian_stok)}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
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

export default TableStockAdjustment;
