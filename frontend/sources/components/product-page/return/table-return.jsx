import React from "react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";
import IconDelete from "../../../assets/icon/material-symbols_delete.svg?react";

function TableReturn({ 
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
  data.forEach((ret, retIndex) => {
    if (ret.items && ret.items.length > 0) {
      ret.items.forEach((item, itemIndex) => {
        tableRows.push({
          ...ret,
          item,
          isFirstRow: itemIndex === 0,
          rowSpan: ret.items.length,
          rowNumber: (currentPage - 1) * 10 + retIndex + 1
        });
      });
    } else {
      tableRows.push({
        ...ret,
        item: null,
        isFirstRow: true,
        rowSpan: 1,
        rowNumber: (currentPage - 1) * 10 + retIndex + 1
      });
    }
  });

  // Calculate total per return
  const getTotalReturn = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.jumlah_barang_return || 0), 0);
  };

  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
            <tr>
              <th className="center">No</th>
              <th>Tanggal Return</th>
              <th>Produk</th>
              <th className="center">Jumlah</th>
              <th className="center">Total</th>
              <th>Nama Pemesan (Distribusi)</th>
              <th>Keterangan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="8" className="center">Tidak ada data return</td>
              </tr>
            ) : (
              tableRows.map((row, index) => (
                <tr key={`${row.id_return}-${index}`}>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.rowNumber}</td>
                      <td rowSpan={row.rowSpan}>{formatDate(row.tanggal_return)}</td>
                    </>
                  )}
                  <td>
                    {row.item ? (
                      <div className="produk-code">
                        <p className="">{row.item.id_produk}</p>
                        <p className="name">
                          {row.item.nama_produk} {row.item.ukuran_produk}{row.item.nama_ukuran_satuan}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="center">{row.item?.jumlah_barang_return || "-"}</td>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>
                        {getTotalReturn(row.items)}
                      </td>
                      <td rowSpan={row.rowSpan}>
                        {row.items?.[0]?.nama_pemesan || "-"}
                        <br />
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                          ({formatDate(row.items?.[0]?.tanggal_distribusi)})
                        </span>
                      </td>
                      <td rowSpan={row.rowSpan}>{row.catatan_return || "-"}</td>
                      <td rowSpan={row.rowSpan}>
                        <IconDelete 
                          className="icon redIcon" 
                          style={{ cursor: 'pointer', width: '20px' }}
                          onClick={() => onDelete && onDelete(row.id_return)}
                        />
                      </td>
                    </>
                  )}
                </tr>
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

export default TableReturn;