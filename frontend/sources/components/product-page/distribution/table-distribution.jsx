import React from "react"; 
import IconEdit from "../../../assets/icon/flowbite_edit-outline.svg?react";
import IconPanahKiri from "../../../assets/icon/carbon_next-filled.svg?react";
import IconPanahKanan from "../../../assets/icon/carbon_next-filled-right.svg?react";

function TableDistribution({ 
  data = [], 
  statusPengiriman = [], 
  onStatusChange, 
  onEdit,
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

  const handleStatusChange = async (id_distribusi, newStatus) => {
    if (onStatusChange) {
      await onStatusChange(id_distribusi, parseInt(newStatus));
    }
  };

  // Calculate total per distribution
  const getDistributionTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.jumlah || 0), 0);
  };

  // Flatten data for table display (each product item as a row, grouped by distribution)
  const tableRows = [];
  data.forEach((dist, distIndex) => {
    if (dist.items && dist.items.length > 0) {
      dist.items.forEach((item, itemIndex) => {
        tableRows.push({
          ...dist,
          item,
          isFirstRow: itemIndex === 0,
          rowSpan: dist.items.length,
          distIndex: (currentPage - 1) * 10 + distIndex + 1,
          total: getDistributionTotal(dist.items)
        });
      });
    } else {
      tableRows.push({
        ...dist,
        item: null,
        isFirstRow: true,
        rowSpan: 1,
        distIndex: (currentPage - 1) * 10 + distIndex + 1,
        total: 0
      });
    }
  });

  return(
    <div className="table-distribution">
      <div className="table-display">
        <table>
          <thead>
            <tr>
              <th className="center">No</th>
              <th>Hari/Tanggal</th>
              <th>Nama Pemesan</th>
              <th>Kode Produk</th>
              <th>Produk</th>
              <th className="center">Jumlah</th>
              <th className="center">Total</th>
              <th>Metode Pengiriman</th>
              <th className="center">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan="11" className="center">Tidak ada data distribusi</td>
              </tr>
            ) : (
              tableRows.map((row, index) => (
                <tr key={`${row.id_distribusi}-${index}`}>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.distIndex}</td>
                      <td rowSpan={row.rowSpan}>{formatDate(row.tanggal_distribusi)}</td>
                      <td rowSpan={row.rowSpan}>{row.nama_pemesan}</td>
                    </>
                  )}
                  <td>
                    {row.item ? (
                      <div className="produk-code">
                        <p className="code">{row.item.id_produk}</p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {row.item ? (
                      <div className="produk-detail">
                        <p className="name">
                          {row.item.nama_produk} {row.item.ukuran_produk}{row.item.nama_ukuran_satuan}
                        </p>
                        <p className="expired">
                          {row.item.tanggal_expired ? formatDate(row.item.tanggal_expired) : "-"}
                        </p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="center">{row.item?.jumlah || "-"}</td>
                  {row.isFirstRow && (
                    <>
                      <td className="center" rowSpan={row.rowSpan}>{row.total}</td>
                      <td rowSpan={row.rowSpan}>{row.nama_metode || "-"}</td>
                      {/* <td rowSpan={row.rowSpan}>{row.catatan_distribusi || "-"}</td> */}
                      <td rowSpan={row.rowSpan}>
                        <select 
                          value={row.id_status || ""}
                          onChange={(e) => handleStatusChange(row.id_distribusi, e.target.value)}
                        >
                          {statusPengiriman.map((status) => (
                            <option key={status.id_status} value={status.id_status}>
                              {status.nama_status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td rowSpan={row.rowSpan}>
                        <IconEdit 
                          className="icon greenIcon" 
                          style={{ cursor: 'pointer' }}
                          onClick={() => onEdit && onEdit(row)}
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

export default TableDistribution;